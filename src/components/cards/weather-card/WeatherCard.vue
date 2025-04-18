<script setup lang="ts">
import { useWeatherStore } from '@/stores/weatherStore'

const weatherStore = useWeatherStore()
</script>

<template>
  <div class="weather-card">
    <Transition name="indicator">
      <div v-if="weatherStore.isLoading" class="indicator">Loading weather...</div>
    </Transition>

    <Transition name="weather-details">
      <div v-if="weatherStore.weather?.id" :key="weatherStore.weather?.id" class="weather-details">
        <h1>Weather on {{ weatherStore.weather?.date }}</h1>
        <h2>{{ weatherStore.weather?.temperature }} Celsius</h2>
        <h2>{{ weatherStore.weather?.weather }}</h2>
      </div>
    </Transition>
  </div>
</template>

<style>
.weather-card {
  width: var(--card-width);
  max-width: 100%;
  background-color: var(--color-background-dark);
  padding: var(--space-xl);
  border-radius: var(--border-radius);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: var(--color-text-light);
  display: flex;
  flex-direction: column;
}

.weather-details h1 {
  color: var(--color-primary);
}

.indicator {
  text-align: center;
  padding: 0 var(--space-md);
  color: var(--color-text-muted);
  max-height: 2rem;
}

.indicator-enter-active,
.indicator-leave-active {
  transition: all var(--transition-duration) var(--transition-easing-slowstart);
}

.indicator-enter-from,
.indicator-leave-to {
  opacity: 0;
  max-height: 0;
}

.weather-details-enter-active,
.weather-details-leave-active {
  transition: all var(--transition-duration) var(--transition-easing-slowstart);
}

.weather-details-enter-from {
  opacity: 0;
  max-height: 0;
}

.weather-details-enter-to {
  opacity: 1;
  max-height: 16rem;
}

.weather-details-leave-from {
  opacity: 1;
  max-height: 16rem;
}

.weather-details-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
