import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDateSelectionStore = defineStore('dateSelection', () => {
  const selectedDate = ref(new Date().toISOString().split('T')[0])

  function setSelectedDate(date: string) {
    selectedDate.value = date
  }

  return { selectedDate, setSelectedDate }
})
