// src / adapters / Adapters / inMemory / order.inMemory.Adapter.ts

import { inMemory } from '../../../../mock/inMemory'
import { Order } from '../../../core/entities/order'
import { OrderGateway1 } from '../../../core/gateways/orderGateway'

// Both dbs (in memory and json server) work both with both gateways (1 and 2)

/* Adapter 1 is object containing methods, following the gateway 1 interface. 
The value of adapter 1 is equal to the return value of an IIFE.
An IIFF (Immediately Invoked Function Expression) is a function that is invoked immediately upon declaration.
An IIFF is written as follows:
  (() => { ... })() 
as opposed to a simple function written as follows:
   () => { ... }
By using an IIFE, the value assigned to gateway 1 is the return value of the IIFE, instead of the IIFE itself.
The reason we use an IIFE rather than simply assigning the return objec to gateway 1 is to have a private variable (orders) that
is accessible by these methods, but not from outside. */

export const orderAdapterInMemory1: OrderGateway1 = (() => {
  const orders: Order[] = [...inMemory.orders]
  return {
    getAll: () => Promise.resolve(orders),
    getById: (orderId: string) => Promise.resolve(orders.find((order) => order.id === orderId)),
  }
})()

/* Adapter 2 is a simple function that returns a object containing methods. These methods
also have access to the private variable (orders) because they are
"closures" (functions that have access to the parent scope, even after the
parent function has closed). */

export const orderAdapterInMemory2 = () => {
  const orders: Order[] = [...inMemory.orders]
  return {
    getAll: () => orders,
    getById: (orderId: string) => orders.find((order) => order.id === orderId),
  }
}

/* Adapters 1 and 2 are exactly the same in their content, but different in their structure and usage:
- nature:
  - adapter 1 is an object with methods
  - adapter 2 is a function that returns an object with methods
- construction:
  - adapter 1 is created by an IIFE that returns the object
  - adatper 2 is declared as a simple function
- usage:
  - adapter 1 is called without (): orderAdapterInMemory1
  - adapter i is called with a (): orderAdapterInMemory2()
*/
