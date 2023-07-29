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
    <SelectDb />
  </nav>
</template>

<script lang="ts" setup>
import AccountSelector from './AccountSelector.vue'
import SelectDb from './SelectDb.vue'
import { sharedState } from '../sharedState.js'
</script>

<style scoped>
nav {
  border-bottom: gray 1px solid;
  margin: 0px;
  padding: 5px;
}
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
</style>
