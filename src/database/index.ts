import { Sequelize } from 'sequelize'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const options = require('./config/config')

const env = process.env.NODE_ENV || 'development'

class Database {
    public connection: Sequelize

    constructor () {
      this.init()
    }

    private async init () {
      const config = options[env as string]

      this.connection = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
      )

      if (this.connection) {
        await this.connection.sync()
      }
    }
}

export default new Database().connection
