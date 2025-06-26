import https from 'node:https'
import { jwtDecode } from 'jwt-decode'

class CarApi {
  constructor() {
    this.auth = {
      api_token: process.env.API_TOKEN || null,
      api_secret: process.env.API_SECRET || null
    }
    this.token = null
    this.exp = null
    this.tokenPromise = null // lock: Promise resolving to token
  }

  check() {
    if (this.auth.api_token == null || this.auth.api_secret == null) {
      throw new Error(
        'API token and secret is required. Please set these in your .env'
      )
    }

    return true
  }

  /**
   * Returns a valid token, refreshing if needed.
   * Uses a lock to prevent simultaneous refreshes.
   */
  async getToken() {
    const now = Math.floor(
      new Date(
        new Date().toLocaleString('en', { timeZone: 'America/New_York' })
      ).getTime() / 1000
    )

    if (this.token && now + 60 < this.exp) {
      return this.token
    }

    if (this.tokenPromise) {
      return this.tokenPromise
    }

    this.tokenPromise = this._fetchToken()

    try {
      const token = await this.tokenPromise
      return token
    } finally {
      this.tokenPromise = null
    }
  }

  /**
   * Internal function to fetch a new JWT token.
   * Updates this.token and this.exp
   */
  _fetchToken() {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify(this.auth)

      const options = {
        hostname: process.env.HOST_NAME,
        port: 443,
        path: '/api/auth/login',
        method: 'POST',
        headers: {
          accept: 'text/plain',
          'content-type': 'application/json',
          'content-length': data.length
        }
      }

      const apiReq = https.request(options, (apiRes) => {
        let responseData = ''

        apiRes.on('data', (chunk) => {
          responseData += chunk
        })

        apiRes.on('end', () => {
          try {
            const decoded = jwtDecode(responseData)
            this.exp = parseInt(decoded.exp)
            this.token = responseData
            console.log('Created new JWT')
            resolve(this.token)
          } catch (error) {
            reject(new Error('Error decoding token: ' + error.message))
          }
        })
      })

      apiReq.on('error', (error) => {
        reject(new Error('Token request failed: ' + error.message))
      })

      apiReq.write(data)
      apiReq.end()
    })
  }

  proxy(req, res) {
    let queryParams = new URLSearchParams(req.query).toString()
    if (queryParams.length > 0) {
      queryParams = '?' + queryParams
    }

    const options = {
      hostname: process.env.HOST_NAME,
      port: 443,
      path: req.path.replace(/^\/proxy/, '') + queryParams,
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${this.token}`
      }
    }

    const apiReq = https.request(options, (apiRes) => {
      res.status(apiRes.statusCode)
      res.set(apiRes.headers)
      apiRes.pipe(res)
    })

    apiReq.on('error', (error) => {
      console.log(error)
      res.status(500).json({
        exception: 'ProxyException',
        message: error.message
      })
    })

    apiReq.end()
  }
}

export default CarApi
