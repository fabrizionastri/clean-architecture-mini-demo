// src/adapters/database/Adapters/jsonServer/item.jsonServer.Adapter.ts
import axios, { AxiosResponse, Method } from 'axios'
import { ItemData } from 'entities/item'

export const myAxios = axios.create({
  baseURL: 'http://localhost:3057/',
  timeout: 1000,
})

export const handleRequest =
  (httpMethod: Method) =>
  async <Item>(url: string, data?: any): Promise<Item | undefined> => {
    try {
      const response: AxiosResponse = await myAxios.request({
        url,
        method: httpMethod,
        data,
      })
      return response.data
    } catch (error) {
      // console.error(error)
      return undefined
    }
  }

export const api = {
  get: handleRequest('get'),
  post: handleRequest('post'),
  delete: handleRequest('delete'),
  put: handleRequest('put'),
}

/* Adapter 1 is a object with methods.
As opposed to the in memory adapter, we don't need to use an IIFE here
becase there are not private properties to refer to. */
export const itemAdapterJsonServer1 = {
  getAll: async (): Promise<ItemData[] | undefined> => {
    const result = await api.get<ItemData[]>('/items')
    return result
  },
  getById: async (id: string): Promise<ItemData | undefined> => {
    const result = await api.get<ItemData>(`/items/${id}`)
    return result
  },
}

// Adapter 2 is a function that returns a object with methods
export const itemAdapterJsonServer2 = () => {
  return {
    getAll: async (): Promise<ItemData[] | undefined> => {
      const result = await api.get<ItemData[]>('/items')
      return result
    },
    getById: async (id: string): Promise<ItemData | undefined> => {
      const result = await api.get<ItemData>(`/items/${id}`)
      return result
    },
  }
}
