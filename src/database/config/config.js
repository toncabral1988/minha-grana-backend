module.exports = {
  development: {
    username: 'docker',
    password: 'docker',
    database: 'minha_grana',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: true,
    define: {
      timestamps: true,
      underscored: true
    }
  },
  test: {
    dialect: 'sqlite',
    storage: './src/__tests__/database.sqlite',
    logging: false,
    define: {
      timestamps: true,
      underscored: true
    }
  }
}
