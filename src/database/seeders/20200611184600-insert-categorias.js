'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkInsert('categorias', [
        { nome: 'SALÁRIO' },
        { nome: 'FIXO' },
        { nome: 'ALIMENTAÇÃO' },
        { nome: 'TRANSPORTE' },
        { nome: 'EDUCAÇÃO' },
        { nome: 'PET' },
        { nome: 'LAZER' },
        { nome: 'IMPOSTOS' },
        { nome: 'TAXAS' },
        { nome: 'OUTROS' },
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
