import { 
  Model, 
  DataTypes, 
  CreateOptions, 
  BulkCreateOptions, 
  InstanceUpdateOptions, 
  BelongsToManySetAssociationsMixin,
  BelongsToManyGetAssociationsMixin,
  Association
} from "sequelize"

import sequelize from '@/database'
import { TipoTransacao } from "./tipo-transacao.model"

class Categoria extends Model {
  public id: number
  public nome: string
  
  public readonly created_at!: Date
  public readonly updated_at!: Date

  public setTipos!: BelongsToManySetAssociationsMixin<TipoTransacao, number>
  public getTipos!: BelongsToManyGetAssociationsMixin<TipoTransacao>

  public readonly tipos?: TipoTransacao[]

  public static associations: {
    tipos: Association<Categoria, TipoTransacao>
  }

}

Categoria.init({
  nome: DataTypes.STRING
}, {
  tableName: 'categoria',
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