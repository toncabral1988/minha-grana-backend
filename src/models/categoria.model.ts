import { 
  Model, 
  DataTypes, 
  CreateOptions, 
  BulkCreateOptions, 
  InstanceUpdateOptions, 
  BelongsToManySetAssociationsMixin,
  BelongsToManyGetAssociationsMixin,
  Association,
  HasManyGetAssociationsMixin
} from "sequelize"

import sequelize from '@/database'
import { TipoTransacao } from "./tipo-transacao.model"
import { Transacao } from "./transacao.model"

class Categoria extends Model {
  public id: number
  public nome: string
  
  public readonly created_at!: Date
  public readonly updated_at!: Date

  public setTipos!: BelongsToManySetAssociationsMixin<TipoTransacao, number>
  public getTipos!: BelongsToManyGetAssociationsMixin<TipoTransacao>

  public getTransacoes!: HasManyGetAssociationsMixin<Transacao>

  public readonly tipos?: TipoTransacao[]
  public readonly transacoes?: Transacao[]

  public static associations: {
    tipos: Association<Categoria, TipoTransacao>
    transacoes: Association<Categoria, Transacao>
  }

}

Categoria.init({
  nome: DataTypes.STRING
}, {
  tableName: 'categorias',
  hooks: {
    beforeCreate: async (tipo: Categoria, options: CreateOptions) => {
      tipo.nome = tipo.nome.toUpperCase()
    },
    beforeBulkCreate: async (tipos: Categoria[], options: BulkCreateOptions) => {
      for (const tipo of tipos) {
        tipo.nome = tipo.nome.toUpperCase()
      }
    },
    beforeUpdate: (tipo: Categoria, options: InstanceUpdateOptions) => {
      tipo.nome = tipo.nome.toUpperCase()
    }
  },
  sequelize
})

Categoria.belongsToMany(TipoTransacao, {
  through: 'categorias_tipos',
  as: 'tipos',
  foreignKey: 'categoria_id'
})

TipoTransacao.belongsToMany(Categoria, {
  through: 'categorias_tipos',
  as: 'categorias',
  foreignKey: 'tipo_transacao_id'
})

export { Categoria }