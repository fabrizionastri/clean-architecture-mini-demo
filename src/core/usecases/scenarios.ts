import { orderAdapterInMemory1, orderAdapterInMemory2 } from '../../adapters/database/inMemory/orderAdapterInMemory'
import {
  orderAdapterJsonServer1,
  orderAdapterJsonServer2,
} from '../../adapters/database/jsonServer/orderAdapterJsonServer'
import { orderGateway2, orderGateway3 } from '../gateways/orderGateway'
import { fetchOrderById1, fetchOrderById2 } from './fetchById'

export const scenarios = [
  { scenario: 'gateway/adapter 1 in memory', fetch: fetchOrderById1, adapter: orderAdapterInMemory1 },
  { scenario: 'gateway/adapter 1 json-server', fetch: fetchOrderById1, adapter: orderAdapterJsonServer1 },
  {
    scenario: 'gateway/gateway 2 in memory ',
    fetch: fetchOrderById2,
    adapter: orderGateway2(orderAdapterInMemory2()),
  },
  {
    scenario: 'gateway/adapter 2 json-server ',
    fetch: fetchOrderById2,
    adapter: orderGateway2(orderAdapterJsonServer2()),
  },
  { scenario: 'gateway/adapter 3 in memory ', fetch: fetchOrderById2, adapter: orderGateway3(orderAdapterInMemory2()) },
  {
    scenario: 'gateway/adapter 3 json-server ',
    fetch: fetchOrderById2,
    adapter: orderGateway3(orderAdapterJsonServer2()),
  },
]
