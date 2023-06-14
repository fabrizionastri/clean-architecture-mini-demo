<template>
  <header>
    <HelloWorld msg="App.vue: You did it! " />
  </header>
  <main>
    <OrderScenarios />
    Main
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import OrderScenarios from './components/OrderScenarios.vue'

export default defineComponent({
  components: {
    HelloWorld,
    OrderScenarios,
  },
})
</script>
