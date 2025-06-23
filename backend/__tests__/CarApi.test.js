import CarApi from '../src/CarApi.js'
import nock from 'nock'
import httpMocks from 'node-mocks-http'

describe('Check Fails', () => {
    beforeAll(() => {
        process.env.API_TOKEN = ''
        process.env.API_SECRET = ''
    })

    it('Throws error', () => {
        expect(() => {
            new CarApi().check()
        }).toThrow(
            'API token and secret is required. Please set these in your .env'
        )
    })
})

describe('Check Passes', () => {
    beforeAll(() => {
        process.env.API_TOKEN = '1'
        process.env.API_SECRET = '2'
    })

    it('Passes', () => {
        expect(new CarApi().check()).toEqual(true)
    })
})

describe('Token', () => {
    it('New', async () => {
        const token =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyMzkwMjJ9.4Adcj3UFYzPUVaVF43FmMab6RlaQD8A9V8wFzzht-KQ'
        nock('https://carapi.app').post('/api/auth/login').reply(200, token)

        const carApi = new CarApi()

        await carApi.getToken()
        expect(carApi.token).toEqual(token)
        expect(carApi.exp).toEqual(1516239022)
    })

    it('Existing', async () => {
        const token =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyMzkwMjJ9.4Adcj3UFYzPUVaVF43FmMab6RlaQD8A9V8wFzzht-KQ'
        const carApi = new CarApi()
        carApi.token = token

        const now = new Date(
            new Date().toLocaleString('en', { timeZone: 'America/New_York' })
        )
        const unixTime = Math.floor(now.getTime() / 1000) + 10000
        carApi.exp = unixTime

        await carApi.getToken()
        expect(carApi.token).toEqual(token)
    })
})

describe('Proxy', () => {
    it('Call', async () => {
        nock('https://carapi.app').get('/api/years').reply(200, '[2025]')

        const token =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyMzkwMjJ9.4Adcj3UFYzPUVaVF43FmMab6RlaQD8A9V8wFzzht-KQ'
        const carApi = new CarApi()
        carApi.token = token

        const req = httpMocks.createRequest({
            method: 'GET',
            url: '/proxy/api/years'
        })
        const res = httpMocks.createResponse({
            statusCode: 200
        })

        carApi.proxy(req, res)
    })
})
