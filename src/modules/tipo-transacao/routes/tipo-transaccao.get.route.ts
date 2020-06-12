import { ServerRoute } from '@hapi/hapi'

import controller from '@/modules/tipo-transacao/controllers/tipo-transacao.get.controller'
import { validate, swaggerConfigurationResponse } from '@/utils/route-options'
import { inputSchemas } from './validation/schemas'
import { get } from './validation/responses'

const route: ServerRoute = {
  method: 'GET',
  path: '/{id}',
  options: {
    tags: ['api', 'tipo-transacao'],
    notes: 'Recupera todos os tipos de transação',
    handler: controller,
    validate: validate({ params: inputSchemas.idParam }),
    plugins: swaggerConfigurationResponse(get)
  }
}

export default route