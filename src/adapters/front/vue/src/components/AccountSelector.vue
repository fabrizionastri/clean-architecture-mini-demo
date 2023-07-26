<template>
  <div style="display: inline-block; margin-right: 30px">
    <select
      v-model="sharedState.selectedAccountId"
      style="font-size: large; padding: 3px 6px; line-height: 2em"
    >
      <option
        style="font-size: large; line-height: 2em"
        v-for="accountId in accountIds"
        :key="accountId"
        :value="accountId"
      >
        {{ accountId }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
// import { ref } from 'vue'
import { sharedState } from '../sharedState.js'
const accountIds = [
  'account0',
  'account1',
  'account2',
  'account3',
  'account4',
  'account5',
]
</script>
