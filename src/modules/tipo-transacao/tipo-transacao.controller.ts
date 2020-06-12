import { Request, ResponseToolkit } from '@hapi/hapi'
import Boom from '@hapi/boom'
import { UniqueConstraintError } from 'sequelize'

import sequelize from '@/database'
import service from '@tipo-transacao/tipo-transacao.service'

export default {

  // TODO store

  store: async (request: Request, h: ResponseToolkit) => {
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
  }, 

  // TODO index

  index: async (request: Request, h: ResponseToolkit) => {
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
  },

  // TODO index by id

  indexById: async (request: Request, h: ResponseToolkit) => {
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
  },

  // TODO update

  update: async (request: Request, h: ResponseToolkit) => {
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
  },

  // TODO remove

  remove: async (request: Request, h: ResponseToolkit) => {
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
}