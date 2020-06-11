'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('categorias_tipos', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        categoria_id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        tipo_transacao_id: {
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

      await queryInterface.addConstraint('categorias_tipos', ['categoria_id'], {
        type: 'foreign key',
        name: 'fk_categoriastipos_categoria',
        references: {
          table: 'categorias',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        transaction
      })

      await queryInterface.addConstraint('categorias_tipos', ['tipo_transacao_id'], {
        type: 'foreign key',
        name: 'fk_categoriastipos_tipo',
        references: {
          table: 'tipos_transacao',
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
      await queryInterface.dropTable('categorias_tipos', { transaction });

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      console.error(error)
      throw error
    }
  }
};
