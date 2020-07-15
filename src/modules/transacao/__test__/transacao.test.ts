import { Server } from '@hapi/hapi'

import { init } from '@/server'
import sequelize from '@/database'
import insertHelper from '@/__tests__/insert.helper'
import utils from './transacao.utils'
import { Transacao } from '@/models/transacao.model'

describe('Módulo - Transação', () => {
  const url = '/api/transacoes'
  let server: Server

  beforeEach(async () => {
    server = await init()
    await sequelize.truncate({ force: true })
    await insertHelper.tipos()
  })

  afterEach(async () => {
    await server.stop()
  })

  describe('POST /', () => {
    it('should insert a transaction on the database', async () => {
      const transacao = utils.generateTransacao()

      const response = await server.inject({
        method: 'POST',
        url,
        payload: transacao
      })

      expect(response.statusCode).toBe(201)

      const result = response.result as Transacao

      expect(result).not.toBeNull()
      expect(result.categoria).not.toBeNull()
      expect(result.tipo).not.toBeNull()
    })

    it('should not insert a transaction when the request body is not valid', async () => {
      const transacao = utils.generateTransacao()

      transacao.valor = "-123.12"

      const response = await server.inject({
        method: 'POST',
        url,
        payload: transacao
      })

      expect(response.statusCode).toBe(400)
    })

    it('should not insert a transaction when the request body is not valid', async () => {
      const transacao = utils.generateTransacao()

      delete transacao.categoria

      const response = await server.inject({
        method: 'POST',
        url,
        payload: transacao
      })

      expect(response.statusCode).toBe(400)
    })
  })

  describe('GET /', () => {
    it('should return a list of all transactions', async () => {
      const transacoes = await Transacao.bulkCreate(utils.generateTransacoes())

      expect(transacoes).not.toBeNull()
      expect(transacoes.length).toBe(5)

      const response = await server.inject({
        method: 'GET',
        url
      })

      expect(response.statusCode).toBe(200)

      const result = response.result as Transacao[]

      expect(result).not.toBeNull()
      expect(result.length).toBe(5)
    })

    it('should not return a list when there are not transactions registered on the database', async () => {
      const response = await server.inject({
        method: 'GET',
        url
      })

      expect(response.statusCode).toBe(404)
    })
  })

  describe('GET ?tipo_transacao_id', () => {
    it('should return a list of all transaction by type', async () => {
      const transacoes = await Transacao.bulkCreate(
        utils.generateTransacoes(3, { tipo: 1 })
      )

      expect(transacoes).not.toBeNull()
      expect(transacoes.length).toBe(3)
      expect(transacoes.some(t => t.tipo_transacao_id === 1))

      let response = await server.inject({
        method: 'GET',
        url: `${url}?tipo_transacao_id=1`
      })

      expect(response.statusCode).toBe(200)

      const result = response.result as Transacao[]

      expect(result).not.toBeNull()
      expect(result.length).toBe(3)
      expect(result.some(t => t.tipo_transacao_id === 1))
    })

    it('should return an error 404 when there is no transaction registered with type informed', async () => {
      const transacoes = await Transacao.bulkCreate(
        utils.generateTransacoes(3, { tipo: 1 })
      )

      expect(transacoes).not.toBeNull()
      expect(transacoes.length).toBe(3)
      expect(transacoes.some(t => t.tipo_transacao_id === 1))

      const response = await server.inject({
        method: 'GET',
        url: `${url}?tipo_transacao_id=2`
      })

      expect(response.statusCode).toBe(404)
    })

    it('should return an error 400 when type informed is invalid', async () => {
      
      let response = await server.inject({
        method: 'GET',
        url: `${url}?tipo_transacao_id=a`
      })

      expect(response.statusCode).toBe(400)

      response = await server.inject({
        method: 'GET',
        url: `${url}?tipo_transacao_id=-23`
      })

      expect(response.statusCode).toBe(400)
    })
  })

  describe('GET ?ano&mes', () => {
    it ('should return a list of transactions by a determined month and year', async () => {
      const transacoes = await Transacao.bulkCreate([
        ...utils.generateTransacoes(5, {
          mes: 7,
          ano: 2020
        }),
        ...utils.generateTransacoes(5)
      ])

      expect(transacoes).not.toBeNull()
      expect(transacoes.length).toBe(10)

      const response = await server.inject({
        method: 'GET',
        url: `${url}?ano=2020&mes=7`
      })

      expect(response.statusCode).toBe(200)
      
      const result = response.result as Transacao[]

      expect(result).not.toBeNull()
      expect(result.length).toBeGreaterThanOrEqual(5)
    })
  })
})