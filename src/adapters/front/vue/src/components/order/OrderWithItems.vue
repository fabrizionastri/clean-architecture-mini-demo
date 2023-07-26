<template>
  <h2>Orders with iterms</h2>
  <ul>
    <li v-for="order in orders">
      <OrderVue :order="order" />
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { OrderData } from '../../../../../../core/coreIndex'
import OrderVue from './OrderView.vue'

interface Result {
  scenario: string
  order: OrderData
}

const orders = ref<Result[]>([])

onMounted(async () => {
  orders.value = await fetchOrders
})
</script>
