import { Sequelize } from 'sequelize'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('./config/config')

const env = process.env.NODE_ENV || 'development'

class Database {
    public connection: Sequelize

    constructor () {
      this.init()
    }

    private async init () {
      this.connection = new Sequelize(config[env as string])

      if (this.connection) {
        await this.connection.sync()
      }
    }
}

export default new Database().connection
