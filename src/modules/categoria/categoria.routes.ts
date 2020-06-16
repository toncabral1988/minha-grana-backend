import { ServerRoute } from '@hapi/hapi'

import CategoriaController from './categoria.controller'
import CategoriaValidations from './categoria.validations'
import CategoriaResponses from './categoria.responses'

const tags = ['api', 'categoria']

const post: ServerRoute = {
  method: 'POST',
  path: '/',
  options: {
    notes: 'Cadastra uma categoria na base de dados',
    tags,
    handler: CategoriaController.store,
    validate: CategoriaValidations.post,
    plugins: CategoriaResponses.postResponses
  }
}

const get: ServerRoute = {
  method: 'GET',
  path: '/',
  options: {
    notes: 'Recupera as categorias registradas na base de dados',
    tags,
    handler: CategoriaController.index,
    validate: CategoriaValidations.get,
    plugins: CategoriaResponses.getResponses
  }
}

const getById: ServerRoute = {
  method: 'GET',
  path: '/{id}',
  options: {
    notes: 'Recupera uma categoria pelo seu id',
    tags,
    handler: CategoriaController.indexById,
    validate: CategoriaValidations.getById,
    plugins: CategoriaResponses.getByIdResponses
  }
}

const put: ServerRoute = {
  method: 'PUT',
  path: '/{id}',
  options: {
    notes: 'Atualiza uma categoria pelo id',
    tags,
    handler: CategoriaController.update,
    validate: CategoriaValidations.put,
    plugins: CategoriaResponses.putResponses
  }
}

const remove: ServerRoute = {
  method: 'DELETE',
  path: '/{id}',
  options: {
    notes: 'Remove uma categotia pelo id',
    tags,
    handler: CategoriaController.remove,
    validate: CategoriaValidations.remove,
    plugins: CategoriaResponses.deleteResponses
  }
}

export default [
  post,
  get,
  getById,
  put,
  remove
]