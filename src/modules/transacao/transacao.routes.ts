import { ServerRoute } from '@hapi/hapi'

import TransacaoController from './transacao.controller'
import TransacaoValidations from './transacao.validations'
import TransacaoResponses from './transacao.responses'
import { validate, swaggerConfigurationResponse } from '@/utils/route-options'
import { inputSchemas } from '../tipo-transacao/validation/schemas'
import responses from '../tipo-transacao/validation/responses'

const tags = ['api', 'transacao']

const post: ServerRoute = {
  method: 'POST',
  path: '/',
  options: {
    notes: 'Registra uma transação na base de dados',
    tags,
    handler: TransacaoController.store,
    validate: TransacaoValidations.post,
    plugins: TransacaoResponses.postResponses
  }
}

const get: ServerRoute = {
  method: 'GET',
  path: '/',
  options: {
    notes: 'Recupera todas as transações',
    tags,
    handler: TransacaoController.index,
    validate: TransacaoValidations.getQuery,
    plugins: TransacaoResponses.get
  }
}

const getById: ServerRoute = {
  method: 'GET',
  path: '/{id}',
  options: {
    tags,
    notes: 'Recupera uma transação pelo seu id',
    handler: TransacaoController.indexById,
    validate: validate({ params: inputSchemas.idParam }),
    plugins: swaggerConfigurationResponse(responses.getById)
  }
}

export default [
  post,
  get,
  getById
]