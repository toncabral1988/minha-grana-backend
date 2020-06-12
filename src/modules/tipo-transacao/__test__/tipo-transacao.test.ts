import { Server } from '@hapi/hapi'
import faker from 'faker'

import { init } from '@/server'
import sequelize from '@/database'
import { TipoTransacao } from '@/models/tipo-transacao.model'

import utils from './tipo-transaction.util'

describe('Módulo - Tipos Transação', () => {
  const url = '/api/tipos-transacao';

  let server: Server;

  beforeEach(async () => {
    server = await init()
    await sequelize.truncate({ force: true })
  })

  afterEach(async () => {
    await server.stop()
  })

  describe('POST /', () => {
    it('should insert a transaction type', async () => {

      const tipoTransacao = utils.generateTipoTransacao

      const response = await server.inject({
        method: 'POST',
        url,
        payload: tipoTransacao
      })

      expect(response.statusCode).toBe(201)

      const result = response.result as TipoTransacao

      expect(result).not.toBeNull()

      expect(result.nome).toBe(tipoTransacao.nome.toUpperCase())
    })

    it('should not insert a transaction type when the request body is invalid', async () => {

      const tipoTransacao = {
        nome: ''
      }

      const response = await server.inject({
        method: 'POST',
        url,
        payload: tipoTransacao
      })

      expect(response.statusCode).toBe(400)
    })

    it('should not insert a transaction type when the name is already registered on the database', async () => {
      const tipoTransacao = await utils.generateInsertedTipoTransacao()

      expect(tipoTransacao).not.toBeNull()

      const response = await server.inject({
        method: 'POST',
        url,
        payload: {
          nome: tipoTransacao.nome
        }
      })

      expect(response.statusCode).toBe(422)
    })
  })

  describe('GET /', () => {
    it('should return a list of transaction type', async () => {
      const tiposTransacoes = await utils.generateInsertedTiposTransacao()

      expect(tiposTransacoes).not.toBeNull()
      expect(tiposTransacoes.length).toBe(3)

      const response = await server.inject({
        method: 'GET',
        url
      })

      expect(response.statusCode).toBe(200)

      const result = response.result as TipoTransacao[]

      expect(result).not.toBeNull()

      expect(result.length).toBe(3)
    })

    it('should not return a list of transaction type when there are no records on the database', async () => {
      const response = await server.inject({
        method: 'GET',
        url
      })

      expect(response.statusCode).toBe(404)
    })
  })

  describe('GET /{id}', () => {
    it('should return a transaction type', async () => {
      const tipoTransacao = await utils.generateInsertedTipoTransacao()

      expect(tipoTransacao).not.toBeNull()

      const response = await server.inject({
        method: 'GET',
        url: `${url}/${tipoTransacao.id}`
      })

      expect(response.statusCode).toBe(200)

      const result = response.result as TipoTransacao

      expect(result).not.toBeNull()

      expect(result.nome).toBe(tipoTransacao.nome)
    })

    it('should not return a transaction type when id is invalid', async () => {
      const response = await server.inject({
        method: 'GET',
        url: `${url}/a`
      })

      expect(response.statusCode).toBe(400)
    })

    it('should not return a transaction type when id is not registered on the database', async () => {
      const response = await server.inject({
        method: 'GET',
        url: `${url}/15`
      })

      expect(response.statusCode).toBe(404)
    })
  })

  describe('PUT /{id}', () => {
    it('should update a transaction type', async () => {
      const tipoTransacao = await utils.generateInsertedTipoTransacao()

      expect(tipoTransacao).not.toBeNull()

      const payload = utils.generateTipoTransacao

      const response = await server.inject({
        method: 'PUT',
        url: `${url}/${tipoTransacao.id}`,
        payload
      })

      expect(response.statusCode).toBe(200)

      const result = response.result as TipoTransacao

      expect(result).not.toBeNull()

      expect(result.nome).toBe(payload.nome.toUpperCase())
    })

    it('should not update a transaction type when the id is invalid', async () => {
      const tipoTransacao = await utils.generateInsertedTipoTransacao()

      expect(tipoTransacao).not.toBeNull()

      const payload = utils.generateTipoTransacao

      const response = await server.inject({
        method: 'PUT',
        url: `${url}/a`,
        payload
      })

      expect(response.statusCode).toBe(400)
    })

    it('should not update a transaction type when the request body is invalid', async () => {
      const tipoTransacao = await utils.generateInsertedTipoTransacao()

      expect(tipoTransacao).not.toBeNull()

      const response = await server.inject({
        method: 'PUT',
        url: `${url}/a`,
        payload: {
          nome: ''
        }
      })

      expect(response.statusCode).toBe(400)
    })

    it('should not update a transaction type when the id not registered on the database', async () => {
      const payload = utils.generateTipoTransacao

      const response = await server.inject({
        method: 'PUT',
        url: `${url}/12`,
        payload
      })

      expect(response.statusCode).toBe(404)
    })

    it('should not update a transaction type when the name is already registered on the database', async () => {

      const tiposTransacao = await utils.generateInsertedTiposTransacao()

      expect(tiposTransacao).not.toBeNull()
      expect(tiposTransacao.length).toBe(3)

      const response = await server.inject({
        method: 'PUT',
        url: `${url}/${tiposTransacao[0].id}`,
        payload: {
          nome: tiposTransacao[1].nome
        }
      })

      expect(response.statusCode).toBe(422)
    })
  })
  describe('DELETE/ {id}', () => {
    it ('should remove a transaction type', async () => {
      const tipoTransacao = await utils.generateInsertedTipoTransacao()

      expect(tipoTransacao).not.toBeNull()

      const response = await server.inject({
        method: 'DELETE',
        url: `${url}/${tipoTransacao.id}`
      })

      expect(response.statusCode).toBe(200)

      const tipoDeleted = await TipoTransacao.findByPk(tipoTransacao.id)

      expect(tipoDeleted).toBeNull()
    })

    it ('should not remove a transaction type when id is invalid', async () => {
      const response = await server.inject({
        method: 'DELETE',
        url: `${url}/a`
      })

      expect(response.statusCode).toBe(400)
    })

    it ('should not remove a transaction type when id is invalid', async () => {
      const response = await server.inject({
        method: 'DELETE',
        url: `${url}/12`
      })

      expect(response.statusCode).toBe(404)
    })
  })

})