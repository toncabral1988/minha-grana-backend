import faker from 'faker'

import CategoriasService from '../categoria.service'
import { Categoria } from '@/models/categoria.model'

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
    const categoriaCriadas: Categoria[] = []

    for (const c of categorias) {
      const categoriaCriada = await CategoriasService.store(c)

      categoriaCriadas.push(categoriaCriada)
    }

    return categoriaCriadas

  }
}