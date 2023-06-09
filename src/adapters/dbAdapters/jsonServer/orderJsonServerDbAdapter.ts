// src/adapters/dbAdapters/jsonServer/order.jsonServer.dbAdapter.ts
import axios, { AxiosResponse, Method } from 'axios'
import { Order } from 'entities/order'

import { OrderGateway1 } from '~/src/core/gateways/orderGateway'

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
export const orderJsonServerDbAdapter1: OrderGateway1 = {
  getAll: async (): Promise<Order[] | undefined> => {
    const result = await api.get<Order[]>('/orders')
    return result
  },
  getById: async (id: string): Promise<Order | undefined> => {
    const result = await api.get<Order>(`/orders/${id}`)
    return result
  },
}

// Adapter 2 is a function that returns a object with methods
export const orderJsonServerDbAdapter2 = () => {
  return {
    getAll: async (): Promise<Order[] | undefined> => {
      const result = await api.get<Order[]>('/orders')
      return result
    },
    getById: async (id: string): Promise<Order | undefined> => {
      const result = await api.get<Order>(`/orders/${id}`)
      return result
    },
  }
}
