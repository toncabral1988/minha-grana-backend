'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('categorias', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        nome: {
          type: Sequelize.STRING,
          allowNull: false
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        }
      }, { transaction })

      await queryInterface.addConstraint('categorias', ['nome'], {
        type: 'unique',
        name: 'un_categorias_nome',
        transaction
      })

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
      await queryInterface.dropTable('categorias', { transaction });

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      console.error(error)
      throw error
    }
  }
};
