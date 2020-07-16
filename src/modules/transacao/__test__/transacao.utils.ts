import faker from 'faker'
import { type as tipo } from 'os'
import categoria from '@/modules/categoria'

const generateTransacao = (opcoes?: {
  tipo?: number,
  dataVencimento?: {
    from: Date, to: Date
  } | null
}) => ({
  descricao: faker.commerce.product(),
  valor: faker.commerce.price(),
  data_realizacao: new Date(),
  data_vencimento:
    opcoes?.dataVencimento ?
      faker.date.between(
        opcoes.dataVencimento.from,
        opcoes.dataVencimento.to) :
      faker.date.future(),
  tipo_transacao_id: opcoes?.tipo ?? faker.random.number({
    min: 1,
    max: 2
  }),
  categoria: {
    nome:  faker.commerce.department()
  }
})

const generateTransacoes = (quantidade = 5, opcoes?: {
  tipo?: number,
  mes?: number,
  ano?: number,
  categoria_id?: number
}) => {
  const transacoes = []

  const dataVencimento = opcoes?.ano && opcoes?.mes ? {
    from: new Date(opcoes?.ano, opcoes?.mes - 1),
    to: new Date(new Date(opcoes?.ano, opcoes?.mes).setDate(-1))
  } : null

  for (let i = 0; i < quantidade; i++) {
    let transacao = generateTransacao({ 
      tipo: opcoes?.tipo, 
      dataVencimento,
    })

    if (opcoes?.categoria_id) {
      delete(transacao.categoria)
    }

    transacoes.push(opcoes?.categoria_id ? ({
      ...transacao,
      categoria_id: opcoes?.categoria_id
    }): transacao)
  }

  return transacoes
}

export default {
  generateTransacao,
  generateTransacoes
}