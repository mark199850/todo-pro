import { defineStore } from 'pinia'
import { todoApi } from '../dummy-api/todo-api/todoApi'
import { ref, computed } from 'vue'
import type { Todo } from '../dummy-api/todo-api/db'
import { useDateSelectionStore } from './dateSelectionStore'

export const useTodoStore = defineStore('todo', () => {
  const dateSelectionStore = useDateSelectionStore()
  // State
  const todos = ref<Todo[]>([])
  const isLoading = ref(false)

  // Getters
  const todosForSelectedDate = computed(() => todos.value)

  // Actions
  async function fetchTodos() {
    isLoading.value = true
    try {
      todos.value = await todoApi.getTodosByDate(dateSelectionStore.selectedDate)
    } catch (error) {
      console.error('Error fetching todos:', error)
    } finally {
      isLoading.value = false
    }
  }

  async function addTodo(description: string) {
    if (description.trim()) {
      try {
        const newTodo = await todoApi.addTodo(description, dateSelectionStore.selectedDate)
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

  async function completeTodo(id: string) {
    try {
      const success = await todoApi.toggleComplete(id)
      return success
    } catch (error) {
      console.error('Error completing todo:', error)
      return false
    }
  }

  // Initialize
  fetchTodos()

  return {
    todos,
    isLoading,
    todosForSelectedDate,
    fetchTodos,
    addTodo,
    removeTodo,
    completeTodo,
  }
})
