<template>
  <h2>Order Datas</h2>
  <ul>
    <li v-for="order in orders" :key="order.id">
      <OrderDetails :order="order" />
      <!-- <pre>
        {{ JSON.stringify(order, null, 2) }}
      </pre> -->
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { fetchOrders } from '../composables/fetchOrders'
import { sharedState } from '../sharedState'
import OrderDetails from './OrderDetails.vue'

const orders = ref(null)

const bobo = async () => {
  const plop = await fetchOrders(sharedState.selectedAccountId)
  // const plop = await fetchOrders('account0')
  console.log('orders  from bobo', plop)
  console.log('plop type', typeof plop)
  console.log('sharedState in bobo', sharedState.selectedAccountId)
  orders.value = plop
}
onMounted(async () => {
  await bobo()
})

// Watch for changes in selectedAccountId
watch(() => sharedState.selectedAccountId, bobo)
</script>
