<template>
  <main>
    <OrderScenarios />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import OrderScenarios from './components/OrderScenarios.vue'

export default defineComponent({
  components: {
    OrderScenarios,
  },
})
</script>

<style>
body {
  font-family: Open-Sans, Helvetica, sans-serif;
}
</style>
