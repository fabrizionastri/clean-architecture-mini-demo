// src/adapters/genericAdapter.ts
export const createGenericAdapter = <T>(data: T[]) => {
  return {
    getAll: (): Promise<T[]> => Promise.resolve([...data]),
    getById: (id: string): Promise<T | undefined> =>
      Promise.resolve(data.find((item: any) => item.id === id)),
  }
}