/**
 * In Vercel (and Next.js), the [...something].js 
 * syntax is called a catch-all route. 
 * It captures any path segments that come after the defined route into an array.
 */

import CarApi from '../../../src/CarApi.js'
import exception from '../../../src/Exception.js'
import { validateSignature } from '../../../src/middleware/auth.js'
import { pathWhitelistMiddleware } from '../../../src/middleware/path.js'
import { rateLimiter } from '../../../src/middleware/rateLimiter.js'

const carApi = new CarApi()
carApi.check()

// Wrap rateLimiter for serverless
const applyRateLimit = (req, res) => {
  return new Promise((resolve, reject) => {
    rateLimiter(req, res, (result) => {
      if (result instanceof Error) {
        reject(result)
      } else {
        resolve(result)
      }
    })
  })
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN)
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-signature, x-timestamp')
  res.setHeader('Access-Control-Allow-Credentials', 'true')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    await applyRateLimit(req, res)

    await new Promise((resolve, reject) => {
      validateSignature(req, res, (err) => {
        if (err) reject(err)
        else resolve()
      })
    })

    await new Promise((resolve, reject) => {
      pathWhitelistMiddleware(req, res, (err) => {
        if (err) reject(err)
        else resolve()
      })
    })

    if (req.url === '/api/proxy' || req.url === '/api/proxy/') {
      return res.status(404).json(exception(req, 'NotFound', 'Route not found', 404))
    }

    await carApi.getToken()
    carApi.proxy(req, res)
  } catch (error) {
    console.error('[Proxy Error]', error)
    res.status(500).json(exception(req, 'ProxyException', error.message, 500))
  }
}
