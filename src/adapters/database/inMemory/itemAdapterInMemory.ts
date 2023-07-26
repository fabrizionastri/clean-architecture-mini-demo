import { ItemData } from 'entities/item'
import { itemDatas } from 'mock/inMemory'

export const itemAdapterInMemory = () => {
  const items: ItemData[] = [...itemDatas]
  return {
    getById: (itemId: string) => items.find((item) => item.id === itemId),
    getByOrderId: (orderId: string) =>
      items.filter((item) => item.orderId === orderId),
    getByOrderIds: (orderIds: string[]) =>
      items.filter((item) => orderIds.includes(item.orderId)),
  }
}
