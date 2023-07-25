import axios from 'axios'
import type { Mock } from 'vitest'

import { genericAdapterJsonServer } from './genericAdapterJsonServer'

const baseUrl = 'http://localhost:3057'
const dummyData = [
  { id: '1', value: 'dummy1' },
  { id: '2', value: 'dummy2' },
]

// This sets the mock adapter on the default instance
vi.mock('axios')
const axiosGetMock = axios.get as Mock

describe('genericAdapterJsonServer', () => {
  beforeEach(() => {
    axiosGetMock.mockImplementation((url: string) => {
      switch (url) {
        case `${baseUrl}/items`:
          return Promise.resolve({ data: dummyData })
        case `${baseUrl}/items/1`:
          return Promise.resolve({ data: dummyData[0] })
        default:
          return Promise.resolve({ data: undefined })
      }
    })
  })
  it('should get all items', async () => {
    const adapter = genericAdapterJsonServer(baseUrl, 'items')
    const items = await adapter.getAll()
    expect(items).toEqual(dummyData)
  })

  it('should get item by id', async () => {
    const adapter = genericAdapterJsonServer(baseUrl, 'items')
    const item = await adapter.getById('1')
    expect(item).toEqual(dummyData[0])
  })

  it('should return error if item not found', async () => {
    const adapter = genericAdapterJsonServer(baseUrl, 'items')
    const item = await adapter.getById('3')
    expect(item).toEqual(undefined)
  })
})
