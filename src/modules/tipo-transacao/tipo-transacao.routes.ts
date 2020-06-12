import { ServerRoute } from '@hapi/hapi'

import TipoTransacaoController from '@tipo-transacao/tipo-transacao.controller'
import { validate, swaggerConfigurationResponse } from '@/utils/route-options'
import { inputSchemas } from './validation/schemas'
import responses from './validation/responses'

const tags = ['api', 'tipo-transacao']

const post: ServerRoute = {
    method: 'POST',
    path: '/',
    options: {
        tags,
        notes: 'Registra um tipo de transação na base de dados',
        handler: TipoTransacaoController.store,
        validate: validate({payload: inputSchemas.post}),
        plugins: swaggerConfigurationResponse(responses.post)
    }
}

const get: ServerRoute = {
  method: 'GET',
  path: '/',
  options: {
    tags: ['api', 'tipo-transacao'],
    notes: 'Recupera todos os tipos de transação',
    handler: TipoTransacaoController.index,
    plugins: swaggerConfigurationResponse(responses.get)
  }
}


const getById: ServerRoute = {
  method: 'GET',
  path: '/{id}',
  options: {
    tags: ['api', 'tipo-transacao'],
    notes: 'Recupera todos os tipos de transação',
    handler: TipoTransacaoController.indexById,
    validate: validate({ params: inputSchemas.idParam }),
    plugins: swaggerConfigurationResponse(responses.getById)
  }
}

const update: ServerRoute = {
  method: 'PUT',
  path: '/{id}',
  options: {
    tags: ['api', 'tipo-transacao'],
    notes: 'Atualiza as informações de um tipo de transação',
    handler: TipoTransacaoController.update,
    validate: validate({params: inputSchemas.idParam, payload: inputSchemas.post }),
    plugins: swaggerConfigurationResponse(responses.put)
  }
}


const remove: ServerRoute = {
  method: 'DELETE',
  path: '/{id}',
  options: {
    notes: 'Remove um tipo de transação',
    tags: ['api', 'tipo-transacao'],
    handler: TipoTransacaoController.remove,
    validate: validate({ params: inputSchemas.idParam }),
    plugins: swaggerConfigurationResponse(responses.remove)
  }
}


export default [
  post,
  get,
  getById,
  update,
  remove
]