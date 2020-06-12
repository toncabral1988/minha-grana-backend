import { ServerRoute } from '@hapi/hapi'

import controller from '@/modules/tipo-transacao/controllers/tipos-transacao.get.controller'
import { swaggerConfigurationResponse } from '@/utils/route-options'
import { inputSchemas } from './validation/schemas'
import { get } from './validation/responses'

const route: ServerRoute = {
  method: 'GET',
  path: '/',
  options: {
    tags: ['api', 'tipo-transacao'],
    notes: 'Recupera todos os tipos de transação',
    handler: controller,
    plugins: swaggerConfigurationResponse(get)
  }
}

export default route