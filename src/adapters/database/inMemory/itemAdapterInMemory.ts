import { ItemData } from 'entities/item'
import { inMemory } from 'mock/inMemory'

import { ItemAdapter } from '../interfaces'

// Both dbs (in memory and json server) work both with both gateways (1 and 2)

/* Adapter 1 is object containing methods
The value of adapter 1 is equal to the return value of an IIFE.
An IIFF (Immediately Invoked Function Expression) is a function that is invoked immediately upon declaration.
An IIFF is written as follows:
  (() => { ... })() 
as opposed to a simple function written as follows:
   () => { ... }
By using an IIFE, the value assigned to gateway is the return value of the IIFE, instead of the IIFE itself.
The reason we use an IIFE rather than simply assigning the return object to the gateway is to have a private variable (items) that
is accessible by these methods, but not from outside. */

export const itemAdapterInMemory1: ItemAdapter = (() => {
  const items: ItemData[] = [...inMemory.items]
  return {
    getAll: () => Promise.resolve(items),
    getById: (itemId: string) =>
      Promise.resolve(items.find((item) => item.id === itemId)),
  }
})()

/* Adapter 2 is a simple function that returns a object containing methods. These methods
also have access to the private variable (items) because they are
"closures" (functions that have access to the parent scope, even after the
parent function has closed). */

export const itemAdapterInMemory2 = (): ItemAdapter => {
  const items: ItemData[] = [...inMemory.items]
  return {
    getAll: () => Promise.resolve(items),
    getById: (itemId: string) =>
      Promise.resolve(items.find((item) => item.id === itemId)),
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
  - adapter 1 is called without (): itemAdapterInMemory1
  - adapter i is called with a (): itemAdapterInMemory2()
*/
