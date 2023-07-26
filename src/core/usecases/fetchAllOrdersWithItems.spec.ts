import { orders } from '~/mock/testData'

import { fetchAllOrdersWithItems } from './fetchAllOrdersWithItems'

describe('fetchAllOrdersWithItems', () => {
  it('should return empty array for unknown account', () => {
    const accountId = '999'
    const results = fetchAllOrdersWithItems(accountId)
    expect(results).toEqual([])
  })
  it('should return all orders with items for a given account', () => {
    const accountId = '123'
    const results = fetchAllOrdersWithItems(accountId)
    expect(results).toEqual(orders)
  })
})
