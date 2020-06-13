import Joi from '@hapi/joi'

import { swaggerConfigurationResponse } from  '@/utils/route-options'

const categoriaSchema = Joi.object({
  id: Joi.number(),
  nome: Joi.string(),
  created_at: Joi.date(),
  updated_at: Joi.date()
}).label('Categoria')

const categoriaWithTypeSchema = Joi.object({
  id: Joi.number(),
  nome: Joi.string(),
  created_at: Joi.date(),
  updated_at: Joi.date(),
  tipos: Joi.array().items({
    id: Joi.number(),
    nome: Joi.string(),
  })
}).label('Categoria')

const categoriasSchemas = Joi.array().items({
  categorias: categoriaWithTypeSchema
})

const internal = {
  description: 'Problema com a operação na base de dados'
}

export default {
  postResponses: swaggerConfigurationResponse({
    200: {
      description: 'Categoria cadastrada com sucesso',
      schemas: categoriaSchema
    },
    400: {
      description: 'Parâmetros da requição inválidos'
    },
    500: internal
  }),

  getResponses: swaggerConfigurationResponse({
    200: {
      description: 'Categorias recuperadas com sucesso',
      schemas: categoriasSchemas
    },
    404: {
      description: 'Nenhuma categoria encontrada'
    },
    500: internal
  }),

  getByIdResponses: swaggerConfigurationResponse({
    200: {
      description: 'Categoria recuperada com sucesso',
      schemas: categoriaSchema
    },
    400: {
      description: 'Id inválido'
    },
    404: {
      description: 'Categoria não encontrada'
    },
    500: internal
  })
}