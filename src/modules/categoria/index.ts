import { TagOptions } from 'hapi-swagger'

import CategoriaRoutes from './categoria.routes'

const tag: TagOptions = {
  name: 'categoria',
  description: 'Categorias das transações'
}

export default {
  name: 'Categoria',
  routes: CategoriaRoutes,
  prefix: 'categorias',
  tag
}