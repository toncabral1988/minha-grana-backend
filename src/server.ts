import glue from '@hapi/glue'
import manifest from './manifest'

import { Server } from '@hapi/hapi'


import sequelize from './database'

const options = {
    relativeTo: __dirname
}

export let server: Server

const compose = async (): Promise<Server> => {
    try {
        server = await glue.compose(await manifest(), options)

        return server
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const init = async (): Promise<Server> => {
    await compose()
    await sequelize.sync()
    await server.initialize()
    return server
}

export default compose