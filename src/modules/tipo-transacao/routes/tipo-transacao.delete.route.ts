import { ServerRoute } from '@hapi/hapi'

import controller from '@tipo-transacao/controllers/tipo-transacao.delete.controller'
import { validate, swaggerConfigurationResponse } from '@/utils/route-options'
import { inputSchemas } from './validation/schemas'
import { remove } from './validation/responses'

const route: ServerRoute = {
  method: 'DELETE',
  path: '/{id}',
  options: {
    notes: 'Remove um tipo de transação',
    tags: ['api', 'tipo-transacao'],
    handler: controller,
    validate: validate({ params: inputSchemas.idParam }),
    plugins: swaggerConfigurationResponse(remove)
  }
}

export default route