import { weatherApi } from '@/dummy-api/weather-api/weatherApi'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useDateSelectionStore } from './dateSelectionStore'
import type { Weather } from '@/dummy-api/weather-api/db'

export const useWeatherStore = defineStore('weather', () => {
  const dateSelectionStore = useDateSelectionStore()

  const weather = ref<Weather>()
  const isLoading = ref(false)
  const error = ref(null)

  const fetchWeather = async () => {
    isLoading.value = true
    try {
      const currentWeather: Weather = await weatherApi.getWeather(dateSelectionStore.selectedDate)
      weather.value = currentWeather
    } catch (error) {
      console.error('Error fetching weather:', error)
    } finally {
      isLoading.value = false
    }
  }

  fetchWeather()
  return { weather, isLoading, error, fetchWeather }
})
