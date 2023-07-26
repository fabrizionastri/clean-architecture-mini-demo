import { orders } from 'mock/inMemory'

import { getAllOrdersForAccountId } from './getAllOrdersForAccountId'

describe('getAllOrdersForAccountId', () => {
  it('should return all orders for an existing account ID', () => {
    const result = getAllOrdersForAccountId('account0')
    expect(result).toEqual(orders.slice(0, 2))
  })

  it('should return empty array for inexistant id', async () => {
    const result = getAllOrdersForAccountId('account99')
    expect(result).toEqual([])
  })
})
