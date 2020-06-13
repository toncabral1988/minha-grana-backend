import { Transaction } from 'sequelize'

import { Categoria } from '@/models/categoria.model'
import { TipoTransacao } from '@/models/tipo-transacao.model'

export default {
  store: async (payload: any, transaction?: Transaction) => {
    const { tipos, ...dadosCategoria } = payload

    const categoria = await Categoria.create(dadosCategoria, { transaction })

    if (tipos) {
      const tiposFounded: TipoTransacao[] = []

      for (const tipo of tipos) {
        const [tipoFounded, ] = await TipoTransacao.findOrCreate({
          where: tipo,
          transaction
        })

        tiposFounded.push(tipoFounded)
      }

      await categoria.setTipos(tiposFounded, { transaction })
    }

    return categoria
  }
}