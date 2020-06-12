import { Request, ResponseToolkit } from '@hapi/hapi'
import Boom from '@hapi/boom'
import { UniqueConstraintError } from 'sequelize'

import sequelize from '@/database'
import service from '@tipo-transacao/services/tipo-transacao.service'

export default async (request: Request, h: ResponseToolkit) => {
  const transaction = await sequelize.transaction()
  try {
    const { id } = request.params

    const tipoTransacao = await service.update(Number(id), request.payload, transaction) 

    if (!tipoTransacao) {
      await transaction.rollback()
      return Boom.notFound('Não foi possível atualizar o tipo de transação, pois ela ainda não está cadastrada na base de dados')
    }

    await transaction.commit()
    return h.response(tipoTransacao)
      .message('Tipo de transação atualizada com sucesso')
      .code(200)
  } catch (error) {
    await transaction.rollback()

    if (error instanceof UniqueConstraintError) {
      return Boom.badData('Não foi possível atualizar o tipo de transação, pois o nome infomrado já está registrado')
    }
    return Boom.internal('Não foi possível atualizar o tipo de transação, pois houve problema durante a operação com a base de dados')
  }
}