import axios from 'axios'

export const selectDb = async (selectedDb: string) => {
  try {
    const response = await axios.post(`http://localhost:3000/db/${selectedDb}`)
    console.log('Vue → selectedDb function:', response)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
