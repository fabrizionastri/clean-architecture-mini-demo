import fs from 'fs'
import path from 'path'

// import { fileURLToPath } from 'url' // use this to get path to current file path
import { inMemoryDb } from '../../mock/inMemoryDb'

export const resetJsonServerDb = () => {
  const json = JSON.stringify(inMemoryDb, null, 2)
  // const dirname = path.dirname(fileURLToPath(import.meta.url))
  const dirname = './mock' // use for use in this repo
  // const dirname = '../../mock/'
  const destination = path.join(dirname, 'jsonServerDb.json')

  fs.writeFile(destination, json, (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('File created successfully')
  })
}

resetJsonServerDb()
