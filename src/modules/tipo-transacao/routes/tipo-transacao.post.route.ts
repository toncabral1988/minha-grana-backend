import { ServerRoute, Request, ResponseToolkit } from '@hapi/hapi'

import controller from '@tipo-transacao/controllers/tipo-transacao.post.controller'
import { validate, swaggerConfigurationResponse } from '@/utils/route-options'
import { inputSchemas } from './validation/schemas'
import { post } from './validation/responses'

const route: ServerRoute = {
    method: 'POST',
    path: '/',
    options: {
        tags: ['api', 'tipo-transacao'],
        notes: 'Registra um tipo de transação na base de dados',
        handler: controller,
        validate: validate({payload: inputSchemas.post}),
        plugins: swaggerConfigurationResponse(post)
    }
}

export default route