import { Manifest } from '@hapi/glue'
import { RegisterOptions } from 'hapi-swagger'
import { resolve } from 'path'

import fileLoader from './utils/file-loader'

const packagePath = '../package.json'
const Pack = require(packagePath)

export default async () => {

    const modules = await fileLoader(resolve(__dirname, 'modules', '**/index.*+(ts|js)'), 2)

    const swaggerOptions: RegisterOptions = {
        info: {
            version: Pack.version,
            title: 'Minha Grana - API',
            description: 'Backend Minha Grana'
        },
        tags: modules.map(m => m.tag),
        grouping: 'tags',
        sortEndpoints: 'ordered',
        jsonPath: '/api/swagger/swagger.json',
        documentationPath: '/api/swagger',
        swaggerUIPath: '/api/swagger/ui'
    }

    const manifest: Manifest = {
        server: {
            host: 'localhost',
            port: 3000,
            routes: { cors: true }
        },
        register: {
            plugins: [
                { plugin: '@hapi/inert' },
                { plugin: '@hapi/vision' },
                {
                    plugin: 'hapi-swagger',
                    options: swaggerOptions
                },
                ...modules.map(m => {
                    return {
                        plugin: m.plugin,
                        routes: m.routes
                    }
                })
            ]
        }
    }

    return manifest
}