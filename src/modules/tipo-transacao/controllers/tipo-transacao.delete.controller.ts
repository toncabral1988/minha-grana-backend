import { Request, ResponseToolkit } from '@hapi/hapi'
import Boom from '@hapi/boom'

import sequelize from '@/database'
import service from '@tipo-transacao/services/tipo-transacao.service'

export default async (request: Request, h: ResponseToolkit) => {
  const transaction = await sequelize.transaction()
  try {
    const { id } = request.params

    const deleted = await service.remove(Number(id), transaction)

    if (!deleted) {
      await transaction.rollback()
      return Boom.notFound('Não foi possível remover o tipo de transação, pois ela não está cadastrada na base de dados')
    }

    await transaction.commit()
    return h.response()
      .message('Tipo de transação removida com sucesso')
      .code(200)
  } catch (error) {
    await transaction.rollback()
    return Boom.internal('Não foi possível remover o tipo de transação, pois houve falha na comunicação com a base de dados')
  }
}