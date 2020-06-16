import faker from 'faker'

import CategoriasService from '../categoria.service'
import { Categoria } from '@/models/categoria.model'
import sequelize from '@/database'

const categorias = [
  {
    nome: faker.name.jobArea(),
    tipos: [
      { nome: 'despesa' },
    ]
  },
  {
    nome: faker.name.jobArea(),
    tipos: [
      { nome: 'receita' }
    ]
  },
  {
    nome: faker.name.jobArea(),
    tipos: [
      { nome: 'despesa' },
      { nome: 'receita' }
    ]
  }
]

export default {
  generateFakeCategoria: () => ({
    nome: faker.name.jobArea()
  }),

  generateCategorias: () => categorias,

  generateCategoriaWithTipos: () => ({
    nome: faker.name.jobArea(),
    tipos: [
      { nome: 'despesa' },
      { nome: 'receita' }
    ]
  }),

  insertCategoriasWithTipos: async () => {
    const transaction = await sequelize.transaction()
    
    try {
      const categoriaCriadas: Categoria[] = []
      for (const c of categorias) {
        const categoriaCriada = await CategoriasService.store(c, transaction)
  
        categoriaCriadas.push(categoriaCriada)
      }
  
      await transaction.commit()
      return categoriaCriadas 
    } catch (error) {
      await transaction.rollback()
    }
  }
}