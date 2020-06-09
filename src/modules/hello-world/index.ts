import { Server, Plugin } from '@hapi/hapi'
import { TagOptions } from 'hapi-swagger'

import importRoutes from '../../utils/import-routes'

export const plugin: Plugin<any> = {
    name: 'Hello World',
    version: '0.0.1',
    register: async (server: Server, options: any): Promise<void> => {
        const routes = await importRoutes(__dirname)

        server.route(routes)
    }
}

const tag: TagOptions = {
    name: 'api',
    description: 'Api Minha Grana'
}

export default {
    plugin: require('./') ,
    routes: {
        prefix: '/api'
    },
    tag
}