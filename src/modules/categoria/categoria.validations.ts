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

export default {
  post: validate({ payload: postPayload })
}