import { Order } from 'entities/order'
import { orderGateway2 as orderGateway } from 'gateways/orderGateway'

describe('Order Gateway', () => {
  let mockAdapter: any
  let gateway: ReturnType<typeof orderGateway>

  beforeEach(() => {
    // Initialize a new mock adapter before each test
    mockAdapter = {
      getAll: vitest.fn(),
      getById: vitest.fn(),
    }

    // Initialize the order gateway with the mock adapter
    gateway = orderGateway(mockAdapter)
  })

  afterEach(() => {
    // Clear all mocks after each test
    vitest.clearAllMocks()
  })

  describe('getAll', () => {
    it('should return all orders', async () => {
      const orders: Order[] = [
        {
          id: '1',
          clientId: '123',
          supplierId: '456',
          name: 'Test Order 1',
          principal: 1000,
        },
        {
          id: '2',
          clientId: '789',
          supplierId: '1011',
          name: 'Test Order 2',
          principal: 2000,
        },
      ]
      mockAdapter.getAll.mockResolvedValue(orders)

      const result = await gateway.getAll()
      expect(result).toEqual(orders)
      expect(mockAdapter.getAll).toHaveBeenCalledTimes(1)
    })
  })

  describe('getById', () => {
    it('should return the order with the specified id', async () => {
      const order: Order = {
        id: '1',
        clientId: '123',
        supplierId: '456',
        name: 'Test Order 1',
        principal: 1000,
      }
      mockAdapter.getById.mockResolvedValue(order)

      const result = await gateway.getById('1')
      expect(result).toEqual(order)
      expect(mockAdapter.getById).toHaveBeenCalledTimes(1)
      expect(mockAdapter.getById).toHaveBeenCalledWith('1')
    })
  })
})
