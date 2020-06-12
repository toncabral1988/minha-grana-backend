import { Request, ResponseToolkit } from '@hapi/hapi'
import Boom from '@hapi/boom'

import sequelize from '@/database'
import service from '@tipo-transacao/services/tipo-transacao.service'

export default async (request: Request, h: ResponseToolkit) => {
  const transaction = await sequelize.transaction()
  try {
    const tiposTransacao = await service.index(transaction)

    if (!(tiposTransacao && tiposTransacao.length > 0)) {
      await transaction.rollback()
      return Boom.notFound('Não existem tipos de transação registradas na base de dados')
    }

    await transaction.commit()
    return h.response(tiposTransacao)
      .message('Tipos de transação recuperadas com sucesso')
      .code(200)
  } catch (error) {
    await transaction.rollback()

    return Boom.internal('Não foi possível recuperar os tipos de transação, pois houve algum problema durante a operação com a base dados')
  }
}