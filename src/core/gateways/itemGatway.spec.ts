import { ItemData } from 'entities/item'
import { itemGateway } from 'gateways/itemGateway'

describe('itemGateway', () => {
  // QESTION : should we add types here?
  let mockAdapter: any
  let gateway: ReturnType<typeof itemGateway>

  beforeEach(() => {
    mockAdapter = {
      getAll: vitest.fn(),
      getById: vitest.fn(),
    }
    gateway = itemGateway(mockAdapter)
  })

  afterEach(() => {
    vitest.resetAllMocks()
  })

  it('getAll should return all items with calculated values', async () => {
    const items: ItemData[] = [
      {
        id: '1',
        orderId: '123',
        name: 'Test Item 1',
        quantity: 5,
        unit: 'Kg',
        unitPriceExclTax: 10,
        taxRate: 0.1,
      },
      {
        id: '2',
        orderId: '456',
        name: 'Test Item 2',
        quantity: 2,
        unit: 'L',
        unitPriceExclTax: 20,
        taxRate: 0.2,
      },
    ]
    mockAdapter.getAll.mockResolvedValue(items)

    const result = await gateway.getAll()

    expect(result).toHaveLength(items.length)
    expect(mockAdapter.getAll).toHaveBeenCalledTimes(1)
    result.forEach((item) => {
      expect(item.unitPriceInclTax).toEqual(
        item.unitPriceExclTax * (1 + item.taxRate)
      )
      expect(item.amountExclTax).toEqual(item.quantity * item.unitPriceExclTax)
      expect(item.amountInclTax).toEqual(
        item.amountExclTax + item.amountExclTax * item.taxRate
      )
      expect(item.taxAmount).toEqual(item.amountExclTax * item.taxRate)
    })
  })

  it('getById should return the item with the specified id with calculated values', async () => {
    const item: ItemData = {
      id: '1',
      orderId: '123',
      name: 'Test Item 1',
      quantity: 5,
      unit: 'Kg',
      unitPriceExclTax: 10,
      taxRate: 0.1,
    }
    mockAdapter.getById.mockResolvedValue(item)

    const result = await gateway.getById('1')

    expect(mockAdapter.getById).toHaveBeenCalledTimes(1)
    expect(mockAdapter.getById).toHaveBeenCalledWith('1')
    expect(result.id).toEqual(item.id)
    expect(result.unitPriceInclTax).toEqual(
      item.unitPriceExclTax * (1 + item.taxRate)
    )
    expect(result.amountExclTax).toEqual(item.quantity * item.unitPriceExclTax)
    expect(result.amountInclTax).toEqual(
      result.amountExclTax + result.amountExclTax * item.taxRate
    )
    expect(result.taxAmount).toEqual(result.amountExclTax * item.taxRate)
  })
})
