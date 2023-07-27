<template>
  <h2>Order Datas</h2>
  <ul>
    <li v-for="order in orders" :key="order">
      <OrderDetails :order="order" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { fetchOrders } from '../composables/fetchOrders'
import OrderDetails from './OrderDetails.vue'
import { sharedState } from '../sharedState'

const orders = ref([])
console.log('orders', orders.value)
console.log('sharedState', sharedState.selectedAccountId)
const accountId = sharedState.selectedAccountId
console.log('accountId', accountId)

orders.value = await fetchOrders(sharedState.selectedAccountId)

onMounted(await fetchOrders('account0'))

watch(() => sharedState.selectedAccountId, fetchOrders)
</script>
