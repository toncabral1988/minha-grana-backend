import { Manifest, PluginObject } from '@hapi/glue'
import { RegisterOptions, TagOptions } from 'hapi-swagger'
import { resolve } from 'path'

import fileLoader from '@/utils/file-loader'
import Modules from '@/modules'

const packagePath = '../package.json'
const Pack = require(packagePath)

export default async () => {

    const modules = await Modules()

    const swaggerOptions: RegisterOptions = {
        info: {
            version: Pack.version,
            title: 'Minha Grana - API',
            description: 'Backend Minha Grana'
        },
        tags: modules.tags,
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
                { plugin: 'blipp' },
                { plugin: '@hapi/inert' },
                { plugin: '@hapi/vision' },
                {
                    plugin: 'hapi-swagger',
                    options: swaggerOptions
                },
                ...modules.plugins
            ]
        }
    }

    return manifest
}