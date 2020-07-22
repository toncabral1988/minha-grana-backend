import Joi from '@hapi/joi'

import { validate } from '@/utils/route-options'

const postPayload = Joi.object({
  descricao: Joi.string()
    .required()
    .not().empty()
    .options({
      messages: {
        'string.required': 'É obrigatório informar uma descrição para a transação',
        'string.empty': 'É obrigatório informar uma descrição para a transação'
      }
    }),
  valor: Joi.number()
    .required()
    .min(0.01)
    .options({
      messages: {
        'number.required': 'É obrigatório informar um valor para a transação',
        'number.min': 'O valor da transação deve ser no mínimo de 0,1 centavos'
      }
    }),
  data_realizacao: Joi.date()
    .required()
    .default(new Date())
    .options({
      messages: {
        'date.required': 'É obrigatório informar a data de realização da transação'
      }
    }),
  data_vencimento: Joi.date()
    .required()
    .default(new Date())
    .options({
      messages: {
        'date.required': 'É obrigatório informar a data de realização da transação'
      }
    }),
  tipo_transacao_id: Joi.number()
    .required()
    .min(1)
    .default(1)
    .options({
      messages: {
        'number.required': 'É obrigatório informar o tipo de transação',
      }
    }),
  situacao: Joi.number()
    .optional()
    .min(0)
    .default(0)
    .options({
      messages: {
        'number.min': 'Informe uma situação válida para a transação',
      }
    }),
  observacoes: Joi.string()
    .optional(),
  categoria: Joi.object({
    id: Joi.number()
      .optional()
      .min(1)
      .options({
        messages: {
          'number.min': 'É necessário informar um id válido'
        }
      }),
    nome: Joi.string()
      .required()
      .not().empty()
      .options({
        messages: {
          'string.required': 'É obrigatório informar o nome da categoria',
          'string.empty': 'É obrigatório informar o nome da categoria válido'
        }
      })
  }).required()
    .options({
      messages: {
        'any.required': 'É obrigatório informar a categoria'
      }
    })
})

const putPayload = Joi.object({
  descricao: Joi.string()
    .optional()
    .not().empty()
    .options({
      messages: {
        'string.empty': 'É obrigatório informar uma descrição para a transação'
      }
    }),
  valor: Joi.number()
    .optional()
    .min(0.01)
    .options({
      messages: {
        'number.min': 'O valor da transação deve ser no mínimo de 0,1 centavos'
      }
    }),
  data_realizacao: Joi.date()
    .optional()
    .options({
      messages: {
        'date': 'Informe uma data de realização válida'
      }
    }),
  data_vencimento: Joi.date()
    .optional()
    .options({
      messages: {
        'date': 'Informe uma data de vencimento válida'
      }
    }),
  categoria_id: Joi.number()
    .optional()
    .min(1)
    .options({
      messages: {
        'number.min': 'Informe o id da categoria de transação válido',
      }
    }),
  tipo_transacao_id: Joi.number()
    .optional()
    .min(1)
    .options({
      messages: {
        'number.min': 'Informe o id do tipo de transação válido',
      }
    }),
  situacao: Joi.number()
    .optional()
    .min(0)
    .options({
      messages: {
        'number.min': 'Informe uma situação válida para a transação',
      }
    }),
  observacoes: Joi.string()
    .optional(),
  categoria: Joi.object({
    id: Joi.number()
      .optional()
      .min(1)
      .options({
        messages: {
          'number.min': 'É necessário informar um id válido'
        }
      }),
    nome: Joi.string()
      .required()
      .not().empty()
      .options({
        messages: {
          'string.required': 'É obrigatório informar o nome da categoria',
          'string.empty': 'É obrigatório informar o nome da categoria válido'
        }
      })
  }).optional()
    .options({
      messages: {
        'any.required': 'É obrigatório informar a categoria'
      }
    })
})

const query = Joi.object({
  tipo_transacao_id: Joi.number()
    .optional()
    .min(1)
    .options({
      messages: {
        'number.min': 'Informe um tipo válido'
      }
    }),
  ano: Joi.number()
    .optional()
    .min(1990)
    .max(2050)
    .options({
      messages: {
        'number.min': 'O ano deve ser superior a 1990',
        'number.max': 'O ano deve ser inferior a 2050'
      }
    }),
  mes: Joi.number()
    .optional()
    .min(1)
    .max(12)
    .options({
      messages: {
        'number.min': 'Não existe mês no valor inferior a um',
        'number.max': 'Nào existe mês no valor numérico superior a doze'
      }
    }),
  categoria_id: Joi.number()
    .optional()
    .min(1)
    .options({
      messages: {
        'number.min': 'O id da categoria é inválido'
      }
    })
})

const idParam = Joi.object({
  id: Joi.number()
    .required()
    .min(1)
    .options({
      messages: {
        'number.min': 'É necessário informar um id válido'
      }
    })
})

export default {
  post: validate({ payload: postPayload }),
  getQuery: validate({ query }),
  getById: validate({ params: idParam }),
  put: validate({ params: idParam, payload: putPayload })
}