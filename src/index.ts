import Server from './server'

async function start(): Promise<void> {
    try {
        const server = await Server()

        await server.start()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()