<template>
  <h2>Order Datas</h2>
  <ul>
    <li v-for="order in orders" :key="order">
      <OrderDetails :order="order" />
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { getAllOrdersForAccountId } from '../../../../../core/usecases/getAllOrdersForAccountId.ts'
import OrderDetails from './OrderDetails.vue'
import { sharedState } from '../sharedState'

const orders = ref([])
console.log('orders', orders.value)
console.log('sharedState', sharedState.selectedAccountId)
const accountId = sharedState.selectedAccountId
console.log('accountId', accountId)

const fetchOrders = async () => {
  orders.value = await getAllOrdersForAccountId(sharedState.selectedAccountId)
}

onMounted(fetchOrders)

watch(() => sharedState.selectedAccountId, fetchOrders)
</script>
