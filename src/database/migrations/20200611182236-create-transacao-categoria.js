'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('transacoes_categorias', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        transacao_id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        categoria_id: {
          type: Sequelize.INTEGER,
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

      await queryInterface.addConstraint('transacoes_categorias', ['transacao_id'], {
        type: 'foreign key',
        name: 'fk_transacoescategorias_categoria',
        references: {
          table: 'transacoes',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        transaction
      })

      await queryInterface.addConstraint('transacoes_categorias', ['categoria_id'], {
        type: 'foreign key',
        name: 'fk_transacoescategorias_tipo',
        references: {
          table: 'categorias',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
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
      await queryInterface.dropTable('transacoes_categorias', { transaction });

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      console.error(error)
      throw error
    }
  }
};
