import { Transaction } from 'sequelize'

import { TipoTransacao } from '@/models/tipo-transacao.model'

export default {
  store: async (payload: any, transaction?: Transaction) => TipoTransacao.create(payload, { transaction }),

  index: async (transaction?: Transaction) => TipoTransacao.findAll({transaction}),

  indexById: async (id: number, transaction?: Transaction) => TipoTransacao.findByPk(id, { transaction }),

  update: async (id: number, payload: any, transaction?: Transaction) => TipoTransacao.findByPk(id, { transaction })
    .then(tipo => tipo?.update({ ...payload }, { transaction })),

  remove: async (id: number, transaction?: Transaction) => TipoTransacao.destroy({ where: { id }, transaction })
}