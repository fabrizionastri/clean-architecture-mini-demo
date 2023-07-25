// src/core/gateways/order.gateway.ts
import { OrderData } from 'entities/order'

/* Gateway 1 needs to be async because for some DB implementations, the request may be async.
Gateway 1 is an interface for an object with methods */
export interface OrderGateway1 {
  getAll: () => Promise<OrderData[] | undefined>
  getById: (orderId: string) => Promise<OrderData | undefined>
}

// gateway 2 is a function that returns a object with methods
export const orderGateway2 = (orderAdapter: any) => {
  return {
    getAll: (): OrderData[] => orderAdapter.getAll(),
    getById: (orderId: string): OrderData => orderAdapter.getById(orderId),
  }
}

// gateway 3 is equivalent to gateway 2: different syntax but same usage and result
export const orderGateway3 = (orderAdapter: any) => {
  return {
    getAll: orderAdapter.getAll,
    getById: orderAdapter.getById,
  }
}
