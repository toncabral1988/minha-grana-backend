import Joi from '@hapi/joi'

import { swaggerConfigurationResponse } from  '@/utils/route-options'

const categoriaSchema = Joi.object({
  id: Joi.number(),
  nome: Joi.string(),
  created_at: Joi.date(),
  updated_at: Joi.date()
}).label('Categoria')

const internal = {
  description: 'Problema com a operação na base de dados'
}

export default {
  postReponses: swaggerConfigurationResponse({
    200: {
      description: 'Categoria cadastrada com sucesso',
      schemas: categoriaSchema
    },
    400: {
      description: 'Parâmetros da requição inválidos'
    },
    500: internal
  })
}