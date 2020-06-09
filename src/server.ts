import glue from '@hapi/glue'
import { Server } from '@hapi/hapi'

import manifest from './manifest'
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
    await sequelize.sync()
    
    await compose()


    await server.initialize()

    return server
}

export default compose