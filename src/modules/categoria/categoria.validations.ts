import Joi from '@hapi/joi'

import { validate } from '@/utils/route-options'

const postPayload = Joi.object({
  nome: Joi.string()
    .required()
    .not().empty()
    .options({
      messages: {
        'string.required': 'É obrigatório informar o nome do usuário',
        'string.min': 'O nome não pode ser vazio'
      }
    }),
  tipos: Joi.array().items({
    id: Joi.number()
      .optional()
      .min(1)
      .options({
        messages: {
          'number.min': 'O id do tipo se informado, deve ser um id válido'
        }
      }),
    nome: Joi.string()
      .required()
      .not().empty()
      .options({
        messages: {
          'string.required': 'É obrigatório informar o nome do usuário',
          'string.min': 'O nome não pode ser vazio'
        }
      })
  }).optional()

})

const queryTipo = Joi.object({
  tipo: Joi.number()
    .min(1)
    .options({
      messages: {
        'number.min': 'É necessário informar um id de tipo válido'
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
  get: validate({ query: queryTipo }),
  getById: validate({ params: idParam })
}