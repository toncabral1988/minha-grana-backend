import { Transaction, Includeable, Op } from "sequelize";

import { Transacao } from "@/models/transacao.model";
import { Categoria } from "@/models/categoria.model";

const include: Includeable[] = [
  {
    association: Transacao.associations.categoria,
    as: 'categoria'
  },
  {
    association: Transacao.associations.tipo,
    as: 'tipo'
  }
]

export default {
  store: async (payload: any, transaction?: Transaction) => {
    const { categoria, ...dadosTransacao } = payload

    const transacao = await Transacao.create(dadosTransacao, { transaction })

    if (!transacao) {
      return null
    }

    if (categoria) {
      categoria.nome = categoria.nome ? categoria.nome.toUpperCase() : categoria.nome
      
      const [categoriaCriada] = await Categoria.findOrCreate({
        where: { ...categoria },
        transaction
      })

      transacao.setCategoria(categoriaCriada, { transaction })
    }

    return Transacao.findByPk(transacao.id, { include, transaction })
  },

  index: async (query: any, transaction?: Transaction) => {

    const { ano, mes, ...where } = query

    const filter = ano && mes ? {
      data_vencimento: {
        [Op.gte]: new Date(ano, mes - 1),
        [Op.lte]: new Date(new Date(ano, mes).setDate(-1))
      }
    } : undefined

    return Transacao.findAll({
      where: {
        ...where,
        ...filter
      },
      order: [
        ['data_vencimento', 'DESC']
      ],
      transaction
    })
  }
}