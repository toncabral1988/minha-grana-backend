'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('tipos_transacao', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
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

      await queryInterface.addConstraint('tipos_transacao', ['nome'], {
        type: 'unique',
        name: 'un_tipostransacao_nome',
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
      await queryInterface.dropTable('tipos_transacao', { transaction });

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      console.error(error)
      throw error
    }
  }
};
