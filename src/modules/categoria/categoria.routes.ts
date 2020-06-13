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
    plugins: CategoriaResponses.postReponses
  }
}

export default [
  post
]