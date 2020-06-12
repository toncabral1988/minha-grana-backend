import { ServerRoute, Request, ResponseToolkit } from '@hapi/hapi'
import { TagOptions } from 'hapi-swagger'

const tag: TagOptions = {
    name: 'api',
    description: 'Api Minha Grana'
}

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

export default {
    name: 'Hello World',
    routes: [route],
    prefix: '',
    tag 
}