import { Request, ResponseToolkit } from '@hapi/hapi'
import Boom from '@hapi/boom'

import sequelize from '@/database'
import TransacaoService from './transacao.service'

const internal = () => Boom.internal('Não foi possível realizar a operação, pois houve falha na comunicação com a base de dados')

export default {
  store: async (request: Request, h: ResponseToolkit) => {
    const transaction = await sequelize.transaction()
    try {
      const transacao = await TransacaoService.store(request.payload, transaction)

      await transaction.commit()
      return h.response(transacao as any)
        .message('Transação adicionada com sucesso')
        .code(201)
    } catch (error) {
      await transaction.rollback()
      return internal()
    }
  },

  index: async (request: Request, h: ResponseToolkit) => {
    const transaction = await sequelize.transaction()
    try {

      const transacoes = await TransacaoService.index(request.query, transaction)

      if (!(transacoes && transacoes.length > 0)) {
        await transaction.rollback()
        return Boom.notFound('Nào foi possóvel recuperar as transações, pois não existem registros na base de dados')
      }

      await transaction.commit()
      return h.response(transacoes)
        .message('Transações recuperadas com sucesso')
        .code(200)
    } catch (error) {
      await transaction.rollback()
      return internal()
    }
  }
}