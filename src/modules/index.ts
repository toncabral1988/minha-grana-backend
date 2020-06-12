

import { Server } from '@hapi/hapi'
import { PluginObject } from '@hapi/glue'
import { TagOptions } from 'hapi-swagger'
import { resolve } from 'path'

import fileLoader from '@/utils/file-loader'
import importRoutes from '@/utils/import-routes'

export default async () => {

  const modules: {
    name: string,
    dirname: string,
    prefix: string,
    tag: TagOptions
  }[] = await fileLoader(resolve(__dirname, '*/**/index.*+(ts|js)'), 2)

  return {
    plugins: modules.map(m => {
      return {
        plugin: {
          name: m.name,
          version: '0.0.1',
          register: async (server: Server, options: any) => {
            const routes = await importRoutes(m.dirname)

            server.route(routes)
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