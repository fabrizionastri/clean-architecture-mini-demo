<template>
  <h2>Order Datas</h2>
  <ul>
    <li v-for="order in orders" :key="order.id">
      <h3>Order: {{ order.name }}</h3>
      <ul>
        <li>Order ID: {{ order.id }}</li>
        <li>Client ID: {{ order.clientId }}</li>
        <li>Supplier ID: {{ order.supplierId }}</li>
        <li>Amount excluding tax: {{ order.amountExclTax }}</li>
        <li>Tax amount: {{ order.taxAmount }}</li>
        <li>Amount including tax: {{ order.amountInclTax }}</li>
        <li>Average tax rate: {{ order.averageTaxRate }}</li>
        <li>Principal: {{ order.principal }}</li>
      </ul>
      <h4 style="text-decoration: underline">Items:</h4>
      <ul>
        <li v-for="item in order.items" :key="item.id">
          <h5>Item: {{ item.name }}</h5>
          <ul>
            <li>Item ID: {{ item.id }}</li>
            <li>Order ID: {{ item.orderId }}</li>
            <li>Quantity: {{ item.quantity }}</li>
            <li>Unit: {{ item.unit }}</li>
            <li>Unit price: {{ item.unitPriceExclTax }}</li>
            <li>Tax rate: {{ item.taxRate * 100 }}%</li>
            <li>Unit price including tax: {{ item.unitPriceInclTax }}</li>
            <li>Amount excluding tax: {{ item.amountExclTax }}</li>
            <li>Tax amount: {{ item.taxAmount }}</li>
            <li>Amount including tax: {{ item.amountInclTax }}</li>
          </ul>
        </li>
      </ul>
      <pre>
        {{ JSON.stringify(order, null, 2) }}
      </pre>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { fetchOrders } from '../composables/fetchOrders'
import { sharedState } from '../sharedState'

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
