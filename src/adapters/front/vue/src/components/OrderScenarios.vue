<template>
  <h1>Vue Order Scenarios</h1>
  <ul>
    <li v-for="result in results">
      <OrderDetail :scenario="result.scenario" :order="result.order" />
    </li>
  </ul>
</template>

<script lang="ts">
import { OrderData, scenarios } from '../../../../../core/coreIndex'
import OrderDetail from './OrderDetail.vue'

interface Result {
  scenario: string
  order: OrderData
}

export default {
  name: 'OrderScenarios',
  data: () => ({
    results: [] as Result[],
  }),
  components: {
    OrderDetail,
  },
  async mounted() {
    for (const scenario of scenarios) {
      const order = await scenario.fetch(scenario.adapter)('order1')
      this.results.push({ scenario: scenario.scenario, order })
    }
  },
}
</script>
