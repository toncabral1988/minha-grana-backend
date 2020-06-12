import { TagOptions } from 'hapi-swagger'

const tag: TagOptions = {
    name: 'tipos-transacao',
    description: 'Api Minha Grana'
}

export default {
    name: 'Tipo Transação',
    dirname: __dirname,
    prefix: 'tipos-transacao',
    tag 
}