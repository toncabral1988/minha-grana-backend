module.exports = {
  development: {
    username: 'docker',
    password: 'docker',
    database: 'minha_grana',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    operatorsAliases: false,
    logging: true,
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true
    }
  }
}
