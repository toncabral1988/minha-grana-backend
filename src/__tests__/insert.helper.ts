import { TipoTransacao } from "@/models/tipo-transacao.model";
import { Categoria } from "@/models/categoria.model";

export default {
  tipos: async () => TipoTransacao.bulkCreate([
    { id: 1, nome: 'Despesa' },
    { id: 2, nome: 'Receita' }
  ]),

  categoria: async () => Categoria.bulkCreate([
    { nome: 'SALÁRIO' },
    { nome: 'FIXO' },
    { nome: 'ALIMENTAÇÃO' },
    { nome: 'TRANSPORTE' },
    { nome: 'EDUCAÇÃO' },
    { nome: 'PET' },
    { nome: 'LAZER' },
    { nome: 'IMPOSTOS' },
    { nome: 'TAXAS' },
    { nome: 'OUTROS' }
  ])
}