import { defineStore } from 'pinia'
import { todoApi } from '../api/todoApi'
import { ref, computed } from 'vue'
import type { Todo } from '../api/db'

export const useTodoStore = defineStore('todo', () => {
  // State
  const selectedDate = ref(new Date().toISOString().split('T')[0])
  const todos = ref<Todo[]>([])
  const isLoading = ref(false)

  // Getters
  const todosForSelectedDate = computed(() => todos.value)

  // Actions
  async function fetchTodos() {
    isLoading.value = true
    try {
      todos.value = await todoApi.getTodosByDate(selectedDate.value)
    } catch (error) {
      console.error('Error fetching todos:', error)
    } finally {
      isLoading.value = false
    }
  }

  function setSelectedDate(date: string) {
    selectedDate.value = date
    fetchTodos()
  }

  async function addTodo(description: string) {
    if (description.trim()) {
      try {
        const newTodo = await todoApi.addTodo(description, selectedDate.value)
        todos.value.push(newTodo)
        return newTodo
      } catch (error) {
        console.error('Error adding todo:', error)
        return null
      }
    }
    return null
  }

  async function removeTodo(id: string) {
    try {
      const success = await todoApi.deleteTodo(id)
      if (success) {
        todos.value = todos.value.filter((todo) => todo.id !== id)
      }
      return success
    } catch (error) {
      console.error('Error removing todo:', error)
      return false
    }
  }

  // Initialize
  fetchTodos()

  return {
    selectedDate,
    todos,
    isLoading,
    todosForSelectedDate,
    fetchTodos,
    setSelectedDate,
    addTodo,
    removeTodo,
  }
})
