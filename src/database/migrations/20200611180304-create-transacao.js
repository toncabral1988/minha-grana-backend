'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('transacoes', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        descricao: {
          type: Sequelize.STRING(256),
          allowNull: false
        },
        valor: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0
        },
        data_vencimento: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        data_realizacao: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.now
        },
        tipo_transacao_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        categoria_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        situacao: {
          type: Sequelize.SMALLINT,
          allowNull: false,
          defaultValue: 0,
          comments: '0 - Não realizado, 1 - Realizado'
        },
        observacoes: {
          type: Sequelize.STRING(1024),
          allowNull: true
        },
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE
      }, { transaction })

      await queryInterface.addConstraint('transacoes', ['tipo_transacao_id'], {
        type: 'foreign key',
        name: 'fk_transacoes_tipo',
        references: {
          table: 'tipos_transacao',
          field: 'id'
        },
        onDelete: 'restrict',
        onUpdate: 'cascade',
        transaction
      })

      await queryInterface.addConstraint('transacoes', ['categoria_id'], {
        type: 'foreign key',
        name: 'fk_transacoes_categoria',
        references: {
          table: 'categorias',
          field: 'id'
        },
        onDelete: 'restrict',
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
      await queryInterface.dropTable('transacoes', { transaction });

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      console.error(error)
      throw error
    }
  }
};
