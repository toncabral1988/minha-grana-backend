'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkInsert('categorias', [
        { nome: 'SALÁRIO', created_at: new Date(), updated_at: new Date() },
        { nome: 'FIXO', created_at: new Date(), updated_at: new Date() },
        { nome: 'ALIMENTAÇÃO', created_at: new Date(), updated_at: new Date() },
        { nome: 'TRANSPORTE', created_at: new Date(), updated_at: new Date() },
        { nome: 'EDUCAÇÃO', created_at: new Date(), updated_at: new Date() },
        { nome: 'PET', created_at: new Date(), updated_at: new Date() },
        { nome: 'LAZER', created_at: new Date(), updated_at: new Date() },
        { nome: 'IMPOSTOS', created_at: new Date(), updated_at: new Date() },
        { nome: 'TAXAS', created_at: new Date(), updated_at: new Date() },
        { nome: 'OUTROS', created_at: new Date(), updated_at: new Date() },
      ], { transaction })

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      console.error(error)
      throw error
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkDelete('categorias', {
        nome: [
          'SALÁRIO',
          'FIXO',
          'ALIMENTAÇÃO',
          'TRANSPORTE',
          'EDUCAÇÃO',
          'PET',
          'LAZER',
          'IMPOSTOS',
          'TAXAS',
          'OUTROS'
        ]
      }, { transaction })

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      console.error(error)
      throw error
    }
  }
}
