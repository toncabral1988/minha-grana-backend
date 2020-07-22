import { TagOptions } from 'hapi-swagger'

import TransacaoRoutes from './transacao.routes'

const tag: TagOptions = {
  name: 'transacao',
  description: 'Transaçòes financeiras'
}

export default {
  name: 'Transação',
  routes: TransacaoRoutes,
  prefix: 'transacoes',
  tag
}