import { 
  Model, 
  DataTypes, 
  BelongsToSetAssociationMixin, 
  BelongsToGetAssociationMixin, 
  Association } 
  from 'sequelize'

import sequelize from '@/database'
import { TipoTransacao } from './tipo-transacao.model'
import { Categoria } from './categoria.model'

class Transacao extends Model {
  public id: number
  public descricao: string
  public valor: number
  public data_vencimento: Date
  public data_realizacao: Date
  public tipo_transacao_id: number
  public categoria_id: number
  public situacao: number
  public observacoes: string

  public readonly created_at!: Date
  public readonly updated_at!: Date

  public setTipo!: BelongsToSetAssociationMixin<TipoTransacao, number>
  public getTipo!: BelongsToGetAssociationMixin<TipoTransacao>
  public setCategoria!: BelongsToSetAssociationMixin<Categoria, number>
  public getCategoria!: BelongsToGetAssociationMixin<Categoria>

  public readonly tipo?: TipoTransacao
  public readonly categoria?: Categoria

  public static associations: {
    categoria: Association<Transacao, Categoria>
    tipo: Association<Transacao, TipoTransacao>
  }
}

Transacao.init({
  descricao: DataTypes.STRING(256),
  valor: DataTypes.DECIMAL(10, 2),
  data_vencimento: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  data_realizacao: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  situacao: {
    type: DataTypes.SMALLINT,
    defaultValue: 0
  },
  observacoes: DataTypes.STRING(1024)
}, {
  tableName: 'transacoes',
  sequelize
})

Transacao.belongsTo(TipoTransacao, {
  foreignKey: 'tipo_transacao_id',
  as: 'tipo'
})

Transacao.belongsTo(Categoria, {
  foreignKey: 'categoria_id',
  as: 'categoria'
})

export { Transacao }