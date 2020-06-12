import { ServerRoute, Request, ResponseToolkit } from '@hapi/hapi'

const route: ServerRoute = {
    method: 'POST',
    path: '/',
    options: {
        tags: ['api', 'tipo-transacao'],
        notes: 'Hello World',
        handler: async (request: Request, h: ResponseToolkit) => {
            return h.response(
                'Hello World!'
            )
        }
    }
}

export default route