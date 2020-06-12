import { ResponseToolkit, Request } from '@hapi/hapi'
import Boom from '@hapi/boom'

import sequelize from '@/database'
import service from '@tipo-transacao/services/tipo-transacao.service'

export default async (request: Request, h: ResponseToolkit) => {
  const transaction = await sequelize.transaction()
  try {
    const { id } = request.params

    const tipoTransacao = await service.indexById(Number(id), transaction)

    if (!tipoTransacao) {
      await transaction.rollback()
      return Boom.notFound('Não foi possível recuperar o tipo de transação, pois ela não está registrada na base de dados')
    }

    await transaction.commit()
    return h.response(tipoTransacao as any)
      .message('Tipo de transação recuperada com sucesso')
      .code(200)
  } catch (error) {
    await transaction.rollback()
    return Boom.internal('Houve algum problema durante a operação com a base de dados')
  }
}