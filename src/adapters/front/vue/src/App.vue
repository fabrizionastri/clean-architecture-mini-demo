<template>
  <main>
    <NavBar />
    <OrderList />
  </main>
</template>

<script lang="ts" setup>
import NavBar from './components/NavBar.vue'
import OrderList from './components/OrderList.vue'
</script>
<style>
body {
  font-family: Open-Sans, Helvetica, sans-serif;
}
</style>
