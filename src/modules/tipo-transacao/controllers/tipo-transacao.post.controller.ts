import { Request, ResponseToolkit } from '@hapi/hapi'
import Boom from '@hapi/boom'
import { UniqueConstraintError } from 'sequelize'

import sequelize from '@/database'
import service from '@tipo-transacao/services/tipo-transacao.service'

export default async (request: Request, h: ResponseToolkit) => {
  const transaction = await sequelize.transaction()
  try {
    const tipoTransacao = await service.store(request.payload, transaction)

    await transaction.commit()
    return h
    .response(tipoTransacao)
    .message('Tipo de transação cadastrada com sucesso')
    .code(201)
  } catch (error) {
    await transaction.rollback()

    if (error instanceof UniqueConstraintError) {
      return Boom.badData('Não foi possível inserir o tipo de transação, pois o nome informado já está registrado na base de dados')
    }

    return Boom.internal(
      'Não foi possível inserir o tipo de transação, pois houve algum problema durante a operação na base de dados'
    )
  }
}