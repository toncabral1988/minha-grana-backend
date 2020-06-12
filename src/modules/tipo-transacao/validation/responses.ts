import Joi from '@hapi/joi'

import { outputSchemas } from './schemas'

export const post = {
  200: {
    description: 'Tipo de transação cadastrado com sucesso',
    schemas: outputSchemas.tipoTransacao
  },
  422: {
    description: 'Tipo de transação já está cadastrado',
  },
  500: {
    description: 'Houve algum problema na operação com a base de dados'
  }
}

export const get = {
  200: {
    description: 'Tipo de transação cadastrado com sucesso',
    schemas: outputSchemas.tiposTransacao
  },
  404: {
    description: 'Não esxitem tipos de transação cadastradas na base de dados'
  },
  500: {
    description: 'Houve algum problema na operação com a base de dados'
  }
}

export const getById = {
  200: {
    description: 'Tipo de transação cadastrado com sucesso',
    schemas: outputSchemas.tiposTransacao
  },
  400: {
    description: 'O id informado é inválido'
  },
  404: {
    description: 'O id informado não está cadastrado'
  },
  500: {
    description: 'Houve algum problema na operação com a base de dados'
  }
}

export const put = {
  200: {
    description: 'Tipo de transação cadastrado com sucesso',
    schemas: outputSchemas.tipoTransacao
  },
  400: {
    description: 'O id informado é inválido'
  },
  404: {
    description: 'O id informado não está cadastrado'
  },
  422: {
    description: 'Tipo de transação já está cadastrado',
  },
  500: {
    description: 'Houve algum problema na operação com a base de dados'
  }
}


export const remove = {
  200: {
    schemas: outputSchemas.tipoTransacao,
    description: 'Tipo de transação removida com sucesso',
  },
  400: {
    description: 'O id informado é inválido'
  },
  404: {
    description: 'O id informado não está cadastrado'
  },
  500: {
    description: 'Houve algum problema na operação com a base de dados'
  }
}


export default {
  post,
  get,
  getById,
  put,
  remove
}