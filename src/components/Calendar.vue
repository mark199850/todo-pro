<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTodoStore } from '../stores/todoStore'

const todoStore = useTodoStore()

const currentDate = ref(new Date())
const selectedDate = computed(() => {
  const dateParts = todoStore.selectedDate.split('-')
  return new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]))
})

const currentMonth = computed(() => {
  const month = currentDate.value.getMonth()
  const year = currentDate.value.getFullYear()
  return { month, year }
})

const daysInMonth = computed(() => {
  const { month, year } = currentMonth.value
  return new Date(year, month + 1, 0).getDate()
})

const firstDayOfMonth = computed(() => {
  const { month, year } = currentMonth.value
  return new Date(year, month, 0).getDay()
})

const calendarDays = computed(() => {
  const days = []
  const { month, year } = currentMonth.value

  for (let i = 0; i < firstDayOfMonth.value; i++) {
    days.push({ day: null, date: null })
  }

  for (let i = 1; i <= daysInMonth.value; i++) {
    const date = new Date(year, month, i)
    days.push({
      day: i,
      date: date,
      isToday: isSameDay(date, new Date()),
      isSelected: isSameDay(date, selectedDate.value),
    })
  }

  return days
})

const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  )
}

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const prevMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

const selectDate = (date: Date) => {
  if (date) {
    todoStore.setSelectedDate(formatDate(date))
  }
}
</script>

<template>
  <div class="calendar">
    <div class="calendar-header">
      <button @click="prevMonth" class="nav-button">&lt;</button>
      <h2>{{ monthNames[currentMonth.month] }} {{ currentMonth.year }}</h2>
      <button @click="nextMonth" class="nav-button">&gt;</button>
    </div>

    <div class="weekdays">
      <div>Mon</div>
      <div>Tue</div>
      <div>Wed</div>
      <div>Thu</div>
      <div>Fri</div>
      <div>Sat</div>
      <div>Sun</div>
    </div>

    <div class="days">
      <div
        v-for="(dayObj, index) in calendarDays"
        :key="index"
        class="day-cell"
        :class="{
          empty: !dayObj.day,
          today: dayObj.isToday,
          selected: dayObj.isSelected,
        }"
        @click="dayObj.date && selectDate(dayObj.date)"
      >
        {{ dayObj.day }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar {
  max-width: 600px;
  margin: 2rem auto;
  background-color: #2c3e50;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.calendar-header h2 {
  color: #fff;
  margin: 0;
  font-size: 1.5rem;
}

.nav-button {
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: bold;
}

.nav-button:hover {
  background-color: #3aa876;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #42b883;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.day-cell {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 4px;
  color: #fff;
  font-weight: 500;
  transition: background-color 0.2s;
}

.day-cell:hover:not(.empty) {
  background-color: #3a4a5e;
}

.empty {
  cursor: default;
}

.today {
  background-color: #42b883;
  color: white;
  font-weight: bold;
}

.selected {
  background-color: #35495e;
  border: 2px solid #42b883;
}

@media (min-width: 1024px) {
  .calendar {
    margin-left: 0;
  }
}
</style>
