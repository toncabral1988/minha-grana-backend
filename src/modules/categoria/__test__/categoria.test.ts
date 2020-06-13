import { Categoria } from '@/models/categoria.model';
import { Server } from '@hapi/hapi'

import { init } from '@/server'
import sequelize from '@/database'
import utils from './categoria.utils'

describe('Módulo - Categoria', () => {
  const url = `/api/categorias`
  let server: Server

  beforeEach(async () => {
    server = await init()
    await sequelize.truncate({ force: true })
  })

  afterEach(async () => {
    await server.stop()
  })

  describe('POST /', () => {
    it('should insert a category on the database', async () => {
      const categoria = utils.generateFakeCategoria()

      const response = await server.inject({
        method: 'POST',
        url,
        payload: categoria
      })

      expect(response.statusCode).toBe(201)

      const result = response.result as Categoria

      expect(result).not.toBeNull()

      expect(result.nome).toBe(categoria.nome.toUpperCase())
    })

    it('should not insert a category when the request paylod is invalid', async () => {
      const response = await server.inject({
        method: 'POST',
        url,
        payload: {
          nome: ''
        }
      })

      expect(response.statusCode).toBe(400)
    })

    it('should insert a category with type associations', async () => {
      const categoria = utils.generateCategoriaWithTipos()

      const response = await server.inject({
        method: 'POST',
        url,
        payload: categoria
      })

      expect(response.statusCode).toBe(201)

      const result = response.result as Categoria

      expect(result).not.toBeNull()
      
      const tipos = await result.getTipos()

      expect(tipos).not.toBeNull()

      expect(tipos.length).toBe(2)
    })

    it('should not insert a category when there are some type association invalid', async () => {
      const categoria = utils.generateCategoriaWithTipos()

      categoria.tipos.push({ nome: '' })

      const response = await server.inject({
        method: 'POST',
        url,
        payload: categoria
      })

      expect(response.statusCode).toBe(400)
    })
  })
})