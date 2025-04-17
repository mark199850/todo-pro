<script setup lang="ts">
import { useWeatherStore } from '@/stores/weatherStore'

const weatherStore = useWeatherStore()
</script>

<template>
  <div class="weatherCard">
    <p v-show="weatherStore.isLoading">loading weather...</p>
    <template v-if="!weatherStore.isLoading">
      <h1>Weather on {{ weatherStore.weather?.date }}</h1>
      <p>{{ weatherStore.weather?.temperature }} Celsius</p>
      <p>{{ weatherStore.weather?.weather }}</p>
    </template>
  </div>
</template>

<style>
.weatherCard {
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 100px;
  border-radius: 8px;
  background-color: #2c3e50;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
