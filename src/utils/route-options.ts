import { RouteOptionsValidate, PluginSpecificConfiguration, Request, ResponseToolkit } from '@hapi/hapi'

const failAction = (request: Request, h: ResponseToolkit, err: any) => {
  throw err
}

export const validate = (validateOptions: {
  headers?: any,
  params?: any,
  query?: any,
  payload?: any
}): RouteOptionsValidate => ({
  ...validateOptions,
  failAction
})

export const swaggerConfigurationResponse = (responses: any): PluginSpecificConfiguration => ({
  'hapi-swagger': {
    responses
  }
})