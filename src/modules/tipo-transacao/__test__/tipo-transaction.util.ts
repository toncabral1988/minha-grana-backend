import faker from 'faker'

import { TipoTransacao } from '@/models/tipo-transacao.model'

export default {
  generateTipoTransacao: {
    nome: faker.company.companyName()
  },

  generateTiposTransacao: (quantidade = 3) => {
    const tipos = []

    for (let i = 0; i < quantidade; i++) {
      tipos.push({
        nome: faker.company.companyName()
      })
    }

    return tipos
  },

  generateInsertedTipoTransacao: async () => await TipoTransacao.create({
    nome: faker.name.jobType()
  }),

  generateInsertedTiposTransacao: async () => await TipoTransacao.bulkCreate([
    { nome: faker.name.jobType() },
    { nome: faker.name.jobType() },
    { nome: faker.name.jobType() },
  ])
}