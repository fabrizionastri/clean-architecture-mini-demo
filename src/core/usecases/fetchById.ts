/* We use the name fetch instead of get only to distinguish the uses case function from the gateway/adapter methods */
import { OrderGateway1 } from 'gateways/orderGateway'

export const fetchOrderById1 = (adapter1: OrderGateway1) => (orderId: string) => {
  return adapter1.getById(orderId)
}

export const fetchOrderById2 = (gateway2: any) => (orderId: string) => {
  return gateway2.getById(orderId)
}
