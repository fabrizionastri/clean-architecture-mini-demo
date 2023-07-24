import { Item } from './item'

// src / core / entities / order.ts
export interface OrderData {
  id: string
  clientId: string
  supplierId: string
  name?: string
  // Questions: Should we store it in the database ?
  principal?: number // principal is the amount including tax.
}

export interface OrderWithItems extends OrderData {
  items: Item[]
  amountExclTax: number
  amountInclTax: number
  taxAmount: number
  princial: number
  averageTaxRate: number
}
