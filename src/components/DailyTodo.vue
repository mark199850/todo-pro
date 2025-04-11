<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TodoItem from './TodoItem.vue'
import PenIcon from './icons/IconPen.vue'
import { todoApi } from '../api/todoApi'

const todos = ref([])
const newTodo = ref('')
const selectedDate = ref('2025-03-01') // Default to March 1, 2025

// Fetch todos for the selected date
const fetchTodos = async () => {
  todos.value = await todoApi.getTodosByDate(selectedDate.value)
}

// Add a new todo
const addTodo = async () => {
  if (newTodo.value.trim()) {
    const addedTodo = await todoApi.addTodo(newTodo.value, selectedDate.value)
    todos.value.push(addedTodo)
    newTodo.value = ''
  }
}

// Remove a todo
const removeTodo = async (todo) => {
  const success = await todoApi.deleteTodo(todo.id)
  if (success) {
    todos.value = todos.value.filter((t) => t.id !== todo.id)
  }
}

// Load todos when component mounts
onMounted(fetchTodos)
</script>

<template>
  <div class="todo-container">
    <h2>Todos for {{ selectedDate }}</h2>

    <form @submit.prevent="addTodo" class="todo-form">
      <input v-model="newTodo" required placeholder="New todo" />
      <button type="submit">Add Todo</button>
    </form>

    <ul class="todo-list">
      <li v-for="todo in todos" :key="todo.id">
        <TodoItem @remove="removeTodo(todo)">
          <template #icon>
            <PenIcon />
          </template>
          <template #todoText>{{ todo.description }}</template>
        </TodoItem>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.todo-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.todo-form {
  display: flex;
  margin-bottom: 20px;
}

.todo-form input {
  flex: 1;
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.todo-form button {
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.todo-list {
  list-style-type: none;
  padding: 0;
}
</style>
