import { genericAdapter } from './genericAdapterInMemory'

interface MockData {
  id: string
  value: string
}

const mockData: MockData[] = [
  { id: '1', value: 'First Item' },
  { id: '2', value: 'Second Item' },
  { id: '3', value: 'Third Item' },
]

describe('Generic Adapter', () => {
  const adapter = genericAdapter<MockData>(mockData)
  it('should return all items', async () => {
    const items = await adapter.getAll()
    expect(items).toEqual(mockData)
  })

  it('should return item by id', async () => {
    const firstItem = mockData[0]
    const item = await adapter.getById(firstItem.id)
    expect(item).toEqual(firstItem)
  })

  it('should return undefined when id not found', async () => {
    const item = await adapter.getById('nonexistentId')
    expect(item).toBeUndefined()
  })
})
