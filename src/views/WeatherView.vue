<script setup lang="ts">
import WeatherCard from '../components/cards/weather-card/WeatherCard.vue'
</script>

<template>
  <main class="view-content">
    <WeatherCard />
  </main>
</template>

<style scoped>
.view-content {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
