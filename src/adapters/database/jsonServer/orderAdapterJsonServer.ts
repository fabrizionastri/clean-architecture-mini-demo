// src/adapters/database/Adapters/jsonServer/order.jsonServer.Adapter.ts
import axios, { AxiosResponse, Method } from 'axios'
import { OrderData } from 'entities/order'

export const myAxios = axios.create({
  baseURL: 'http://localhost:3057/',
  timeout: 1000,
})

export const handleRequest =
  (httpMethod: Method) =>
  async <Order>(url: string, data?: any): Promise<Order | undefined> => {
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
export const orderAdapterJsonServer1 = {
  getAll: async (): Promise<OrderData[] | undefined> => {
    const result = await api.get<OrderData[]>('/orders')
    return result
  },
  getById: async (id: string): Promise<OrderData | undefined> => {
    const result = await api.get<OrderData>(`/orders/${id}`)
    return result
  },
}

// Adapter 2 is a function that returns a object with methods
export const orderAdapterJsonServer2 = () => {
  return {
    getAll: async (): Promise<OrderData[] | undefined> => {
      const result = await api.get<OrderData[]>('/orders')
      return result
    },
    getById: async (id: string): Promise<OrderData | undefined> => {
      const result = await api.get<OrderData>(`/orders/${id}`)
      return result
    },
  }
}
