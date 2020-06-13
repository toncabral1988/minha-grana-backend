import { Categoria } from '@/models/categoria.model';
import { Server, ServerInjectResponse } from '@hapi/hapi'

import { init } from '@/server'
import sequelize from '@/database'
import utils from './categoria.utils'
import { TipoTransacao } from '@/models/tipo-transacao.model';

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

  describe('GET /', () => {
    it('should return a list of categories', async () => {
      const categorias = await Categoria.bulkCreate(utils.generateCategorias())

      expect(categorias).not.toBeNull()
      expect(categorias.length).toBe(3)

      const response = await server.inject({
        method: 'GET',
        url
      })

      expect(response.statusCode).toBe(200)

      const result = response.result as Categoria[]

      expect(result).not.toBeNull()

      expect(result.length).toBe(3)
    })

    it('should not return a list of categories when there are not records on the database', async () => {
      const response = await server.inject({
        method: 'GET',
        url
      })

      expect(response.statusCode).toBe(404)
    })
  })

  describe('GET /?tipo', () => {
    it('should return a list of categories by type', async () => {
      const categorias = await utils.insertCategoriasWithTipos()

      expect(categorias).not.toBeNull()
      expect(categorias.length).toBe(3)

      const tipos = await TipoTransacao.findAll()

      expect(tipos).not.toBeNull()
      expect(tipos.length).toBeGreaterThan(0)

      const response = await server.inject({
        method: 'GET',
        url: `${url}?tipo=${tipos[0].id}`
      })

      expect(response.statusCode).toBe(200)

      const result = response.result as Categoria[]

      expect(result).not.toBeNull()
      expect(result.length).toBe(2)

      for (const r of result) {
        expect(r.tipos).not.toBeNull()
        expect(r.tipos?.length).toBeGreaterThan(0)

        expect(r.tipos?.some(t => t.id === tipos[0].id))
      }
    })

    it('should not return a list of categories when type id is invalid', async () => {
      const response = await server.inject({
        method: 'GET',
        url: `${url}/?tipo=4`
      })

      expect(response.statusCode).toBe(404)
    })
  })

  describe('GET /{id}', () => {
    it('should return a category by id', async () => {
      const categoria = await Categoria.create(utils.generateFakeCategoria())

      expect(categoria).not.toBeNull()

      const response = await server.inject({
        method: 'GET',
        url: `${url}/${categoria.id}`
      })

      expect(response.statusCode).toBe(200)

      const result = response.result as Categoria

      expect(result).not.toBeNull()
      expect(result.nome).toBe(categoria.nome)
    })

    it('should not return a category when id is invalid', async () => {
      const response = await server.inject({
        method: 'GET',
        url: `${url}/a`
      })

      expect(response.statusCode).toBe(400)
    })

    it('should not return a category when id is not found on the database', async () => {
      const response = await server.inject({
        method: 'GET',
        url: `${url}/14`
      })

      expect(response.statusCode).toBe(404)
    })
  })

  describe('PUT  /{id}', () => {
    it('should udpate a category', async () => {
      const categoria = await Categoria.create(utils.generateFakeCategoria())

      expect(categoria).not.toBeNull()

      const dados = utils.generateCategoriaWithTipos()

      const response = await server.inject({
        method: 'PUT',
        url: `${url}/${categoria.id}`,
        payload: dados
      })

      expect(response.statusCode).toBe(200)

      const result = response.result as Categoria

      expect(result).not.toBeNull()
      expect(result.nome).toBe(dados.nome.toUpperCase())

      const tipos = await result.getTipos()

      expect(tipos).not.toBeNull()
      expect(tipos.length).toBe(dados.tipos.length)
    })

    it('should not update when id is invalid', async() => {
      const categoria = await Categoria.create(utils.generateFakeCategoria())

      expect(categoria).not.toBeNull()

      const dados = utils.generateCategoriaWithTipos()

      const response = await server.inject({
        method: 'PUT',
        url: `${url}/a`,
        payload: dados
      })

      expect(response.statusCode).toBe(400)
    })

    it('should not update when request payload is invalid', async() => {
      const categoria = await Categoria.create(utils.generateFakeCategoria())

      expect(categoria).not.toBeNull()

      const dados = utils.generateCategoriaWithTipos()

      dados.nome = ''

      const response = await server.inject({
        method: 'PUT',
        url: `${url}/${categoria.id}`,
        payload: dados
      })

      expect(response.statusCode).toBe(400)
    })

    it('should not update when id is not registered on the database', async() => {
      const dados = utils.generateCategoriaWithTipos()

      const response = await server.inject({
        method: 'PUT',
        url: `${url}/12`,
        payload: dados
      })

      expect(response.statusCode).toBe(404)
    })

    it('should not update when the name is already registered on the database', async() => {
      const categorias = await Categoria.bulkCreate(utils.generateCategorias())

      expect(categorias).not.toBeNull()
      expect(categorias.length).toBe(3)

      const response = await server.inject({
        method: 'PUT',
        url: `${url}/${categorias[0].id}`,
        payload: {
          nome: categorias[1].nome
        }
      })

      expect(response.statusCode).toBe(422)
    })
  })
})