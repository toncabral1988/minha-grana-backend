import { Server, ServerRoute } from '@hapi/hapi'
import { TagOptions } from 'hapi-swagger'
import { resolve } from 'path'

import fileLoader from '@/utils/file-loader'

export default async () => {

  const modules: {
    name: string,
    routes: ServerRoute[],
    prefix: string,
    tag: TagOptions
  }[] = await fileLoader(resolve(__dirname, '*/**/index.*+(ts|js)'), 2)

  return {
    plugins: modules.map(m => {
      return {
        plugin: {
          name: m.name,
          version: '0.0.1',
          register: async (server: Server) => {
            server.route(m.routes)
          }
        },
        routes: {
          prefix: `/api/${m.prefix}`
        }
      }
    }),
    tags: modules.map(m => m.tag)
  }
}