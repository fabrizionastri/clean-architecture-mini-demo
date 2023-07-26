import { ItemData } from 'entities/item'
import { inMemory } from 'mock/inMemory'

export const itemAdapterInMemory = () => {
  const items: ItemData[] = [...inMemory.itemDatas]
  return {
    getById: (itemId: string) => items.find((item) => item.id === itemId),
    getByOrderId: (orderId: string) =>
      items.filter((item) => item.orderId === orderId),
    getManyByOrderId: (orderIds: string[]) =>
      items.filter((item) => orderIds.includes(item.orderId)),
  }
}
