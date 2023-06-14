<template>
  <h1 class="green">{{ msg }}</h1>
  <h3>HelloWorld: You've successfully created a project with</h3>
</template>

<script lang="ts">
export default {
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
}
</script>
