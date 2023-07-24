import axios from 'axios'
import type { Mock } from 'vitest'

import { genericAdapter as genericAdapter } from './genericAdapterJsonServer'

const baseUrl = 'http://localhost:3057'
const dummyData = [
  { id: '1', value: 'dummy1' },
  { id: '2', value: 'dummy2' },
]

// This sets the mock adapter on the default instance
vi.mock('axios')
const axiosGetMock = axios.get as unknown as Mock

axiosGetMock.mockImplementation((url: string) => {
  switch (url) {
    case '/items':
      return Promise.resolve({ data: dummyData })
    case '/items/1':
      return Promise.resolve({ data: dummyData[0] })
    default:
      return Promise.reject(new Error('Not found'))
  }
})

describe('genericAdapter', () => {
  it('should get all items', async () => {
    const adapter = genericAdapter(baseUrl, 'items')
    const items = await adapter.getAll()
    expect(items).toEqual(dummyData)
  })

  it('should get item by id', async () => {
    const adapter = genericAdapter(baseUrl, 'items')
    const item = await adapter.getById('1')
    expect(item).toEqual(dummyData[0])
  })
})
