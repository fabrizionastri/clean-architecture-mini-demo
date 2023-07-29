<template>
  <select v-model="selectedDb" @change="onChange">
    <option v-for="option in options" :value="option.value">
      {{ option.text }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue'
import { selectDb } from '../composables/selectDb'

type Option = { text: string; value: string }

const options: Ref<Option[]> = ref([
  { text: 'In Memory', value: 'inMemory' },
  { text: 'JSON Server', value: 'jsonServer' },
])
const selectedDb: Ref<string> = ref<string>(options.value[0].value)

const onChange = async () => {
  const response = await selectDb(selectedDb.value)
  console.log('response from onChange:', response)
  console.log(
    `IMPORTANT NOTE: changing the selectedDb in Vue will have no effect, because the Db source is in the process.env, and this cannot be changed from vue, in spite of all the console.logs .... You need to change the .env file and restart the server.`
  )
}
</script>
