<script setup lang="ts">
import Calendar from './Calendar.vue'

defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="title">
    <h1 class="green">{{ msg }}</h1>
    <h3>Select a date to view and manage your todos</h3>
    <Calendar />
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.title h1,
.title h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .title h1,
  .title h3 {
    text-align: left;
  }
}
</style>
