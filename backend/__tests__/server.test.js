import app from '../server.js'
import supertest from 'supertest'

const requestWithSupertest = supertest(app)

describe('Health Check', () => {
    it('GET /health should return http 200', async () => {
        const res = await requestWithSupertest.get('/health')
        expect(res.status).toEqual(200)
    })
})

describe('Not Found Middleware', () => {
    it('GET / should return http 404', async () => {
        const res = await requestWithSupertest.get('/')
        expect(res.status).toEqual(404)
    })
    it('GET /anything/really should return http 404', async () => {
        const res = await requestWithSupertest.get('/anything/really')
        expect(res.status).toEqual(404)
    })
})
