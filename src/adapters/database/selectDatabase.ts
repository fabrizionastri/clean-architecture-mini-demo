import { config } from 'dotenv'

import { createItemAdapterInMemory } from './inMemory/createItemAdapterInMemory'
import { createOrderAdapterInMemoryForAccountId } from './inMemory/createOrderAdapterInMemoryForAccountId'
import { createItemAdapterJsonServer } from './jsonServer/createItemAdapterJsonServer'
import { createOrderAdapterJsonServer } from './jsonServer/createOrderAdapterJsonServer'

config() // load variables from .env into process.env
console.log('process.env.STORAGE_TYPE', process.env.STORAGE_TYPE)
let createItemAdapter, createOrderAdapter
console.log('process.env.STORAGE_TYPE', process.env.STORAGE_TYPE)
switch (process.env.STORAGE_TYPE) {
  case 'inMemory':
    createItemAdapter = createItemAdapterInMemory
    createOrderAdapter = createOrderAdapterInMemoryForAccountId
    break
  case 'jsonServer':
    createItemAdapter = createItemAdapterJsonServer
    createOrderAdapter = createOrderAdapterJsonServer
    break
  default:
    throw new Error('Invalid storage type')
}

export { createItemAdapter, createOrderAdapter }
