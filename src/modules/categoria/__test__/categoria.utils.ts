import faker from 'faker'

export default {
  generateFakeCategoria: () => ({
    nome: faker.name.jobArea()
  }),

  generateCategoriaWithTipos: () => ({
    nome: faker.name.jobArea(),
    tipos: [
      { nome: 'despesa' },
      { nome: 'receita' }
    ]
  })
}