<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import OrderList from './components/OrderList.vue'
</script>

<template>
  <main>
    <NavBar />
    <OrderList />
  </main>
</template>

<style>
body {
  font-family: 'Open Sans', sans-serif;
}
select {
  font-size: large;
  padding: 3px 6px;
  line-height: 2em;
}
</style>
