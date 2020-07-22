import Joi from '@hapi/joi'

import { swaggerConfigurationResponse } from '@/utils/route-options'

const transacaoSchema = Joi.object({
  id: Joi.number(),
  descricao: Joi.string(),
  valor: Joi.number(),
  data_vencimento: Joi.date(),
  data_realizacao: Joi.date(),
  situacao: Joi.number(),
  observacoes: Joi.string(),
  created_at: Joi.date(),
  updated_at: Joi.date(),
  categoria: Joi.object({
    id: Joi.number(),
    nome: Joi.string()
  }),
  tipo: Joi.object({
    id: Joi.number(),
    nome: Joi.string()
  })
}).label('Transação')

const transacoesSchema = Joi.array().items({
  transacoes: transacaoSchema
})

const internal = {
  description: 'Problema com a operação na base de dados'
}

export default {
  postResponses: swaggerConfigurationResponse({
    200: {
      description: 'Transação cadastrada com sucesso',
      schemas: transacaoSchema
    },
    400: {
      description: 'Parâmetros da requição inválidos'
    },
    500: internal
  }),

  get: swaggerConfigurationResponse({
    200: {
      description: 'Transações recuperadas com sucesso',
      schemas: transacoesSchema
    },
    404: {
      description: 'Não existem transaçòes cadastradas no banco'
    },
    500: internal
  }),

  getById: swaggerConfigurationResponse({
    200: {
      description: 'Transação recuperada com sucesso',
      schemas: transacaoSchema
    },
    400: {
      description: 'O id informado não é válido'
    },
    404: {
      description: 'Não existe transação com o id informado'
    },
    500: internal
  }),

  put: swaggerConfigurationResponse({
    200: {
      description: 'Transação cadastrada com sucesso',
      schemas: transacaoSchema
    },
    400: {
      description: 'Parâmetros da requição inválidos'
    },
    404: {
      description: 'Não existe transação com o id informado'
    },
    500: internal
  })
}