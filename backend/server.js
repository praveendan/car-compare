import express from 'express'
import cors from 'cors'
import CarApi from './src/CarApi.js'
import exception from './src/Exception.js'

const app = express()
const port = process.env.NODE_ENV == 'test' ? 0 : 3000

const carApi = new CarApi()
carApi.check()

app.use(
    cors({
        origin: process.env.CORS_ORIGIN || null
    })
)

app.use(express.static('public'))

app.get('/health', (req, res) => {
    res.status(200).json({ msg: 'ok' })
})

app.get('/proxy/api/*', (req, res) => {
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

app.use((req, res) => {
    res.status(404).json(exception(req, 'NotFound', 'Route not found', 404))
})

app.listen(port, () => console.log('Server running on port 3000'))

export default app
