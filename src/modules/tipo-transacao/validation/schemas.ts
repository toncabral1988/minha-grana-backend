import Joi from '@hapi/joi'

export const inputSchemas = {
  post: Joi.object({
    nome: Joi.string()
      .required()
      .not()
      .empty()
      .options({
        messages: {
          'string.required': 'É obrigatório informa o nome do tipo de transação',
          'string.empty': 'O nome do tipo de transação não pode ser vazio'
        }
      })
  }),

  idParam: Joi.object({
    id: Joi.number()
      .required()
      .min(1)
      .options({
        messages: {
          'number.required': 'É necessário informar o id do tipo de transação',
          'number.min': 'É necessário informar um ID válido'
        }
      })
  })
}

const tipoTransacao = Joi.object({
  id: Joi.number(),
  nome: Joi.string(),
  created_at: Joi.date(),
  updated_at: Joi.date()
})

export const outputSchemas = {
  tipoTransacao,

  tiposTransacao: Joi.array().items({
    tipoTransacao
  })
}