import { ServerRoute } from '@hapi/hapi'

import TransacaoController from './transacao.controller'
import TransacaoValidations from './transacao.validations'
import TransacaoResponses from './transacao.responses'

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

export default [
  post,
  get
]