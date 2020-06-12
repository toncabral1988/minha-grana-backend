import { ServerRoute } from '@hapi/hapi'

import controller from '@tipo-transacao/controllers/tipo-transacao.put.controller'
import { validate, swaggerConfigurationResponse } from '@/utils/route-options'
import { inputSchemas } from './validation/schemas'
import { put } from './validation/responses'

const route: ServerRoute = {
  method: 'PUT',
  path: '/{id}',
  options: {
    tags: ['api', 'tipo-transacao'],
    notes: 'Atualiza as informações de um tipo de transação',
    handler: controller,
    validate: validate({params: inputSchemas.idParam, payload: inputSchemas.post }),
    plugins: swaggerConfigurationResponse(put)
  }
}

export default route