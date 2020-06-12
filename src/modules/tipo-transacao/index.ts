import { TagOptions } from 'hapi-swagger'
import TipoTransacaoRoutes from './tipo-transacao.routes'

const tag: TagOptions = {
    name: 'tipos-transacao',
    description: 'Api Minha Grana'
}

export default {
    name: 'Tipo Transação',
    routes: TipoTransacaoRoutes,
    prefix: 'tipos-transacao',
    tag 
}