<script setup lang="ts">
import { ref } from 'vue'
import TodoItem from './TodoItem.vue'
import PenIcon from './icons/IconPen.vue'
import { useTodoStore } from '../stores/todoStore'
import type { Todo } from '../dummy-api/db'
const todoStore = useTodoStore()
const newTodo = ref('')

const addTodo = async () => {
  if (newTodo.value.trim()) {
    await todoStore.addTodo(newTodo.value)
    newTodo.value = ''
  }
}

const removeTodo = async (todo: Todo) => {
  await todoStore.removeTodo(todo.id)
}
</script>

<template>
  <div class="daily-todo">
    <h2>Todos for {{ todoStore.selectedDate }}</h2>

    <div v-if="todoStore.isLoading" class="loading">Loading todos...</div>

    <form @submit.prevent="addTodo" class="todo-form">
      <input v-model="newTodo" required placeholder="Add a new todo" class="todo-input" />
      <button type="submit" class="add-button">Add</button>
    </form>

    <div v-if="!todoStore.isLoading && todoStore.todos.length === 0" class="empty-state">
      No todos for this day. Add one above!
    </div>

    <ul class="todo-list">
      <li v-for="todo in todoStore.todos" :key="todo.id">
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
.daily-todo {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: #2c3e50;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: #fff;
}

h2 {
  color: #42b883;
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.loading {
  text-align: center;
  padding: 1rem;
  color: #aaa;
}

.todo-form {
  display: flex;
  margin-bottom: 1.5rem;
  gap: 0.5rem;
}

.todo-input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #3a4a5e;
  border-radius: 4px;
  background-color: #35495e;
  color: #fff;
}

.todo-input::placeholder {
  color: #aaa;
}

.add-button {
  padding: 0.75rem 1.5rem;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.add-button:hover {
  background-color: #3aa876;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #aaa;
  font-style: italic;
}

.todo-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

@media (min-width: 1024px) {
  .daily-todo {
    margin-left: 0;
  }
}
</style>
