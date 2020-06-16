import { 
  Model, 
  DataTypes, 
  CreateOptions, 
  BulkCreateOptions, 
  InstanceUpdateOptions, 
  Transaction,
  BelongsToManyGetAssociationsMixin,
  Association,
  FindOptions,
  where
} from "sequelize";

import sequelize from '@/database'
import { Categoria } from "./categoria.model";

class TipoTransacao extends Model {
  public id: number
  public nome: string

  public readonly created_at!: Date
  public readonly updated_at!: Date

  public getCategorias!: BelongsToManyGetAssociationsMixin<Categoria>

  public readonly categorias?: Categoria[]

  public static associations: {
    categorias: Association<TipoTransacao, Categoria>
  }
}

const hooks = {
  beforeCreate: async (tipo: TipoTransacao, options: CreateOptions) => {
    tipo.nome = tipo.nome.toUpperCase()

    if (!tipo.id) {
      tipo.id = (await lastIndex(options.transaction)) + 1
    }
  },
  beforeBulkCreate: async (tipos: TipoTransacao[], options: BulkCreateOptions) => {

    
    let lastId = (await lastIndex(options.transaction))

    for (const tipo of tipos) {
      tipo.nome = tipo.nome.toUpperCase()

      if (!tipo.id) {
        tipo.id = ++lastId
      }
    }
  },
  beforeUpdate: (tipo: TipoTransacao, options: InstanceUpdateOptions) => {
    tipo.nome = tipo.nome.toUpperCase()
  }
}

const lastIndex = async (transaction?: Transaction) => {
  const [lastIndex] = await TipoTransacao.findAll({
    limit: 1,
    order: [['id', 'DESC']],
    transaction
  })
  
  if (lastIndex) {
    return lastIndex.id
  }
  
  return 0
  
}


TipoTransacao.init({
  nome: DataTypes.STRING
}, {
  tableName: 'tipos_transacao',
  hooks,
  sequelize
})

export { TipoTransacao }