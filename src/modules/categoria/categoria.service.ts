import { Transaction, Includeable } from 'sequelize'

import { Categoria } from '@/models/categoria.model'
import { TipoTransacao } from '@/models/tipo-transacao.model'
import { number } from '@hapi/joi'

const include: Includeable[] = [{
  association: Categoria.associations.tipos,
  as: 'tipos',
  attributes: ['id', 'nome'],
  through: {
    attributes: []
  }
}]

export default {
  store: async (payload: any, transaction?: Transaction) => {
    const { tipos, ...dadosCategoria } = payload

    const categoria = await Categoria.create(dadosCategoria, { transaction })

    if (tipos) {
      const tiposFounded: TipoTransacao[] = []

      for (const tipo of tipos) {
        const [tipoFounded,] = await TipoTransacao.findOrCreate({
          where: { ...tipo },
          transaction
        })

        tiposFounded.push(tipoFounded)
      }

      await categoria.setTipos(tiposFounded, { transaction })
    }

    return categoria
  },

  index: async (options: { query?: any, transaction?: Transaction }) => {

    const { query, transaction } = options

    const { tipo } = query

    if (tipo) {
      return TipoTransacao.findByPk(tipo, { transaction })
        .then(t => t?.getCategorias({ include, transaction }))
    } else {
      return Categoria.findAll({ transaction, include })
    }
  },

  indexById: async (id: number, transaction?: Transaction) =>
    Categoria.findByPk(id,
      {
        transaction,
        include
      })
}