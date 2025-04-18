<script setup lang="ts">
import { ref } from 'vue'
import TodoItem from './TodoItem.vue'
import { useTodoStore } from '../../../stores/todoStore'
import type { Todo } from '../../../dummy-api/todo-api/db'
import { useDateSelectionStore } from '../../../stores/dateSelectionStore'

const todoStore = useTodoStore()
const dateSelectionStore = useDateSelectionStore()
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

const completeTodo = async (todo: Todo) => {
  await todoStore.completeTodo(todo.id)
}
</script>

<template>
  <div class="daily-todo-card">
    <div class="card-header">
      <h2>Todos for {{ dateSelectionStore.selectedDate }}</h2>

      <form @submit.prevent="addTodo" class="todo-form">
        <input v-model="newTodo" required placeholder="Add a new todo" class="todo-input" />
        <button type="submit" class="add-button">Add</button>
      </form>

      <Transition name="indicator">
        <div v-if="todoStore.isLoading" class="indicator">Loading todos...</div>
      </Transition>
    </div>

    <div class="todo-content">
      <div v-if="!todoStore.isLoading && todoStore.todos.length === 0" class="empty-state">
        No todos for this day. Add one above!
      </div>

      <ul class="todo-list">
        <TransitionGroup name="todo-item">
          <div v-for="todo in todoStore.todos" :key="todo.id" class="todo-item">
            <TodoItem
              @remove="removeTodo(todo)"
              @complete="completeTodo(todo)"
              v-bind:completed="todo.completed"
            >
              <template #todoText>{{ todo.description }}</template>
            </TodoItem>
          </div>
        </TransitionGroup>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.daily-todo-card {
  width: var(--card-width);
  max-width: 100%;
  background-color: var(--color-background-dark);
  border-radius: var(--border-radius);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  max-height: var(--card-max-height);
  color: var(--color-text-light);
  overflow: hidden;
}

.card-header {
  padding: var(--space-lg) var(--space-lg) var(--space-md);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.todo-content {
  flex: 1;
  overflow-y: auto;
  padding: 0 var(--space-lg);
  scrollbar-width: thin;
  scrollbar-color: var(--color-primary) var(--color-background-darker);
}

.todo-content::-webkit-scrollbar {
  width: 8px;
}

.todo-content::-webkit-scrollbar-track {
  background: var(--color-background-darker);
  border-radius: 4px;
}

.todo-content::-webkit-scrollbar-thumb {
  background-color: var(--color-primary);
  border-radius: 4px;
}

h2 {
  color: var(--color-primary);
  margin-top: 0;
  margin-bottom: var(--space-md);
  font-size: 1.5rem;
}

.indicator {
  text-align: center;
  padding: 0rem 1rem;
  color: var(--color-text-muted);
  max-height: 2rem;
}

.indicator-enter-active,
.indicator-leave-active {
  transition:
    opacity 0.25s ease-out,
    max-height 0.25s ease-out;
}

.indicator-enter-from,
.indicator-leave-to {
  opacity: 0;
  max-height: 0;
}

.todo-form {
  display: flex;
  margin-bottom: var(--space-md);
  gap: var(--space-sm);
}

.todo-input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid var(--color-border-dark);
  border-radius: var(--border-radius);
  background-color: var(--color-background-darker);
  color: var(--color-text-light);
}

.todo-input::placeholder {
  color: var(--color-text-muted);
}

.todo-item-enter-active,
.todo-item-leave-active {
  transition: all var(--transition-duration) var(--transition-easing-slowstart);
}

.todo-item-enter-from {
  opacity: 0;
  max-height: 0;
}

.todo-item-enter-to {
  opacity: 1;
  max-height: 6rem;
}

.todo-item-leave-from {
  opacity: 1;
  max-height: 6rem;
}

.todo-item-leave-to {
  opacity: 0;
  max-height: 0;
}

.add-button {
  padding: 0.75rem 1.5rem;
  background-color: var(--color-primary);
  color: var(--color-text-light);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color var(--transition-duration);
}

.add-button:hover {
  background-color: var(--color-primary-hover);
}

.empty-state {
  text-align: center;
  padding: var(--space-xl);
  color: var(--color-text-light);
  font-style: italic;
}

.todo-list {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0 0 var(--space-lg) 0;
  margin: 0;
}

@media (min-width: 1024px) {
  .daily-todo-card {
    margin-left: 0;
  }
}

@media (max-width: 1023px) {
  .daily-todo-card {
    display: flex;
    flex: 1;
    width: auto;
  }
}
</style>
