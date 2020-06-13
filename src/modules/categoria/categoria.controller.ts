import { Request, ResponseToolkit } from '@hapi/hapi'
import Boom from '@hapi/boom'

import sequelize from '@/database'
import service from './categoria.service'

const internal = () => Boom.internal('Não foi possível realizar a operação, pois houve falha na comunicação com a base de dados')

export default {
  store: async (request: Request, h: ResponseToolkit) => {
    const transaction = await sequelize.transaction()
    try {
      const categoria = await service.store(request.payload)

      await transaction.commit()
      return h.response(categoria)
        .message('Categoria cadastrada com sucesso')
        .code(201)
    } catch (error) {
      await transaction.rollback()
      return internal()
    }
  }
}