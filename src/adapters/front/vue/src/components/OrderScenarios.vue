<template>
  <h2>Order Datas</h2>
  <ul>
    <li v-for="result in results">
      <OrderDetail :scenario="result.scenario" :order="result.order" />
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { OrderData, scenarios } from '../../../../../core/coreIndex'
import OrderDetail from './OrderDetail.vue'

interface Result {
  scenario: string
  order: OrderData
}

const results = ref<Result[]>([])

onMounted(async () => {
  for (const scenario of scenarios) {
    const order = await scenario.fetch(scenario.adapter)('order1')
    results.value.push({ scenario: scenario.scenario, order })
  }
})
</script>
