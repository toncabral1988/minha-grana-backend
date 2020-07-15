import faker from 'faker'
import { type as tipo } from 'os'

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
    nome: faker.commerce.department()
  }
})

const generateTransacoes = (quantidade = 5, opcoes?: { tipo?: number, mes?: number, ano?: number }) => {
  const transacoes = []

  const dataVencimento = opcoes?.ano && opcoes?.mes ? {
    from: new Date(opcoes?.ano, opcoes?.mes - 1),
    to: new Date(new Date(opcoes?.ano, opcoes?.mes).setDate(-1))
  } : null

  for (let i = 0; i < quantidade; i++) {
    transacoes.push(generateTransacao({ tipo: opcoes?.tipo, dataVencimento }))
  }

  return transacoes
}

export default {
  generateTransacao,
  generateTransacoes
}