import { ServerRoute, Request, ResponseToolkit } from '@hapi/hapi'

const route: ServerRoute = {
    method: 'GET',
    path: '/',
    options: {
        tags: ['api'],
        notes: 'Hello World',
        handler: async (request: Request, h: ResponseToolkit) => {
            return h.response(
                'Hello World!'
            )
        }
    }
}

export default route