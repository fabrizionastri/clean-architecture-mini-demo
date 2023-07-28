<template>
  <h2>Order Datas</h2>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { fetchOrders } from '../composables/fetchOrders'
// import OrderDetails from './OrderDetails.vue'
import { sharedState } from '../sharedState'
import { Order } from 'entities/order'

const orders = ref<Order[]>([])
console.log('orders step 1', orders.value)
console.log('sharedState', sharedState.selectedAccountId)
const accountId = sharedState.selectedAccountId
console.log('accountId', accountId)

const plop = await fetchOrders(sharedState.selectedAccountId)
console.log('plop', plop)

orders.value = plop

const bobo = async () => {
  const plop: Order[] = await fetchOrders(sharedState.selectedAccountId)
  console.log('orders  from bobo', plop)
  console.log('plop type', typeof plop)
  orders.value = plop
}
onMounted(async () => {
  bobo()
})

// Watch for changes in selectedAccountId
watch(() => sharedState.selectedAccountId, bobo)
</script>
