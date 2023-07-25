import axios from 'axios'

export const genericAdapterJsonServer = <T>(
  baseUrl: string,
  resource: string
) => {
  const endpoint = `${baseUrl}/${resource}`
  return {
    getAll: async (): Promise<T[]> => {
      const response = await axios.get(endpoint)
      return response.data
    },
    getById: async (id: string): Promise<T> => {
      const response = await axios.get(`${endpoint}/${id}`)
      return response.data
    },
  }
}
