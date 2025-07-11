import express from 'express'
import cors from 'cors'
import CarApi from './src/CarApi.js'
import exception from './src/Exception.js'
import { validateSignature } from './src/middleware/auth.js'
import { pathWhitelistMiddleware } from './src/middleware/path.js'
import { rateLimiter } from './src/middleware/rateLimiter.js'

const app = express()
const port = process.env.NODE_ENV == 'test' ? 0 : 5000

const carApi = new CarApi()
carApi.check()

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-signature', 'x-timestamp']
  })
)

app.options('*', cors()) // Handle preflight

app.use(express.static('public'))

app.get('/health', (req, res) => {
    res.status(200).json({ msg: 'ok' })
})

app.get('/proxy/api/*', validateSignature, pathWhitelistMiddleware, (req, res) => {
    if (req.path === '/proxy/api' || req.path === '/proxy/api/') {
        res.status(404).json(exception(req, 'NotFound', 'Route not found', 404))
        return
    }

    carApi
        .getToken()
        .then(() => {
            carApi.proxy(req, res)
        })
        .catch((error) => {
            console.error(error)
            res.status(500).json(
                exception(req, 'ProxyException', error.message, 500)
            )
        })
})

app.use(rateLimiter)

app.use((req, res) => {
    res.status(404).json(exception(req, 'NotFound', 'Route not found', 404))
})

app.listen(port, () => console.log('Server running on port 3000'))

export default app
