import { Server } from '@hapi/hapi'
import faker from 'faker'

import { init } from '@/server'
import sequelize from '@/database'

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

      const tipoTransacao = {
        nome: faker.name.jobTitle
      }

      const response = await server.inject({
        method: 'POST',
        url,
        payload: tipoTransacao
      })

      expect(response.statusCode).toBe(200)

      expect(response.result).not.toBeNull()
    })
  })
})