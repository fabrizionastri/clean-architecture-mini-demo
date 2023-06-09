// src/core/gateways/order.gateway.ts
import { Order } from '../entities/order'

/* Gateway 1 needs to be async because for some DB implementations, the request may be async.
Gateway 1 is an interface for an object with methods */
export interface OrderGateway1 {
  getAll: () => Promise<Order[] | undefined>
  getById: (orderId: string) => Promise<Order | undefined>
}

// gateway 2 is a function that returns a object with methods
export const orderGateway2 = (orderDbAdapter: any) => {
  return {
    getAll: (): Order[] => orderDbAdapter.getAll(),
    getById: (orderId: string): Order => orderDbAdapter.getById(orderId),
  }
}

// gateway 3 is equivalent to gateway 2: different syntax but same usage and result
export const orderGateway3 = (orderDbAdapter: any) => {
  return {
    getAll: orderDbAdapter.getAll,
    getById: orderDbAdapter.getById,
  }
}
