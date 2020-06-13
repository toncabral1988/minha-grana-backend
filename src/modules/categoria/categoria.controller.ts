import { Request, ResponseToolkit } from '@hapi/hapi'
import Boom from '@hapi/boom'
import { UniqueConstraintError } from 'sequelize'

import sequelize from '@/database'
import CategoriaService from './categoria.service'

const internal = () => Boom.internal('Não foi possível realizar a operação, pois houve falha na comunicação com a base de dados')

export default {
  store: async (request: Request, h: ResponseToolkit) => {
    const transaction = await sequelize.transaction()
    try {
      const categoria = await CategoriaService.store(request.payload)

      await transaction.commit()
      return h.response(categoria)
        .message('Categoria cadastrada com sucesso')
        .code(201)
    } catch (error) {
      await transaction.rollback()
      return internal()
    }
  },

  index: async (request: Request, h: ResponseToolkit) => {
    const transaction = await sequelize.transaction()
    try {
      const categorias = await CategoriaService.index({query: request.query, transaction})

      if (!(categorias && categorias.length > 0)) {
        await transaction.rollback()
        return Boom.notFound('Não existem categorias registradas na base de dados')
      }

      await transaction.commit()
      return h.response(categorias)
        .message('Categorias recuperadas com sucesso')
        .code(200)
    } catch (error) {
      await transaction.rollback()
      return internal()
    }
  },

  indexById: async (request: Request, h: ResponseToolkit) => {
    const transaction = await sequelize.transaction()
    try {
      const { id } = request.params

      const categoria = await CategoriaService.indexById(Number(id), transaction)

      if (!categoria) {
        await transaction.rollback()
        return Boom.notFound('O id informado não está registrado na base de dados')
      }

      await transaction.commit()
      return h.response(categoria as any)
        .message('Categoria recuperada com sucesso')
        .code(200)
    } catch (error) {
      await transaction.rollback()
      return internal()
    } 
  },

  update: async (request: Request, h: ResponseToolkit) => {
    const transaction = await sequelize.transaction()
    try {
      const { id } = request.params

      const categoria = await CategoriaService.update(Number(id), request.payload, transaction)

      if (!categoria) {
        await transaction.rollback()
        return Boom.notFound('Não foi possível atualizar a categoria, pois o id informado não está registrado na base de dados')
      }

      await transaction.commit()
      return h.response(categoria as any)
        .message('Categoria atualizada com sucesso')
        .code(200)
    } catch (error) {
      await transaction.rollback()

      if (error instanceof UniqueConstraintError) {
        return Boom.badData('Não foi possível atualizar a categoria, pois o nome informado já está registrado na base de dados')
      }
      return internal()
    }
  }
}