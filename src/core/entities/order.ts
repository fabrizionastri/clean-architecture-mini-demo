// src / core / entities / order.ts
export interface Order {
  id: string
  clientId: string
  supplierId: string
  name?: string
}
