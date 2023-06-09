/* We use the name fetch instead of get only to distinguish the uses case function from the gateway/adapter methods */

export const fetchOrderById = (gateway: any) => (orderId: string) => {
  return gateway.getById(orderId)
}
