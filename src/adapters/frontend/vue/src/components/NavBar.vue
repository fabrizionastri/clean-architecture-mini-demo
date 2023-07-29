<template>
  <nav>
    <h1 style="display: inline-block; margin-right: 50px; margin-bottom: 10px">
      Vue App
    </h1>
    <AccountSelector />
    <a ref="/">Vue App</a>
    <a ref="/order">Orders</a>
    <a ref="/order-data">Order datas</a>
    <a ref="/">Items</a>
    <a ref="/">ItemDatas</a>
  </nav>
</template>

<script lang="ts" setup>
import AccountSelector from './AccountSelector.vue'
</script>

<style scoped>
a {
  margin: 0px 5px;
  padding: 5px;
  text-decoration: none;
  color: blue;
  cursor: pointer;
}
input {
  font-size: large;
  margin: 3px 6px;
  width: 150px;
}
nav {
  border-bottom: gray 1px solid;
  margin: 0px;
  padding: 5px;
}
</style>
