import axios from 'axios'

// import dotenv from 'dotenv'
// dotenv.config()
// const API_URL = process.env.API_URL
const API_URL = 'http://localhost:8787'

export const fetchOrders = async (accountId: string) => {
  const url = `${API_URL}/order/${accountId}`
  console.log('Vue → fetchOrders → url', url)
  try {
    const response = await axios.get(url)
    console.log('OK')
    console.log('Vue → fetchOrders:', response.data)
    return response.data
  } catch (error) {
    console.log('Not OK')
    console.error(error)
  }
}
