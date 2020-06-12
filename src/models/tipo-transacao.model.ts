import { 
  Model, 
  DataTypes, 
  CreateOptions, 
  BulkCreateOptions, 
  InstanceUpdateOptions 
} from "sequelize";

import sequelize from '@/database'
import lastIndex from '@/utils/last-index'

class TipoTransacao extends Model {
  public id: number
  public nome: string

  public readonly created_at!: Date
  public readonly updated_at!: Date
}

const hooks = {
  beforeCreate: async (tipo: TipoTransacao, options: CreateOptions) => {
    tipo.nome = tipo.nome.toUpperCase()

    if (!tipo.id) {
      tipo.id = (await lastIndex<TipoTransacao>(options.transaction)) + 1
    }
  },
  beforeBulkCreate: async (tipos: TipoTransacao[], options: BulkCreateOptions) => {
    for (const tipo of tipos) {
      tipo.nome = tipo.nome.toUpperCase()

      tipo.id = (await lastIndex<TipoTransacao>(options.transaction)) + 1
    }
  },
  beforeUpdate: (tipo: TipoTransacao, options: InstanceUpdateOptions) => {
    tipo.nome = tipo.nome.toUpperCase()
  }
}

TipoTransacao.init({
  nome: DataTypes.STRING
}, {
  tableName: 'tipos_transacao',
  hooks,
  sequelize
})

export default TipoTransacao