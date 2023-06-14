<template>
  <h2>Vue Order Detail! - {{ scenario }}</h2>
  <ul>
    <li>Order ID: {{ order.id }}</li>
    <li>Name: {{ order.name }}</li>
    <li>Client ID: {{ order.clientId }}</li>
    <li>Supplier ID: {{ order.supplierId }}</li>
  </ul>
</template>

<script lang="ts">
export default {
  name: 'OrderDetail',
  props: {
    order: {
      type: Object,
      required: true,
    },
    scenario: {
      type: String,
      required: true,
    },
  },
}
</script>
