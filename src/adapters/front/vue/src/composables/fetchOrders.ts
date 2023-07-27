import axios from 'axios'

export const fetchOrders = async (accountId: string) => {
  try {
    const response = await axios.get(`http://localhost:3000/${accountId}`)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
