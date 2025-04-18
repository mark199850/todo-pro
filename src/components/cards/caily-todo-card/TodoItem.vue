<script setup lang="ts">
defineEmits(['remove', 'complete'])
const props = defineProps({ completed: Boolean })
</script>

<template>
  <div class="item">
    <input type="checkbox" @click="$emit('complete')" v-bind:checked="props.completed" />
    <div class="details">
      <h3>
        <slot name="todoText"></slot>
      </h3>
      <slot></slot>
    </div>
    <button class="remove-button" @click="$emit('remove')">X</button>
  </div>
</template>

<style scoped>
input {
  accent-color: var(--color-primary);
}

.remove-button {
  background-color: var(--color-primary);
  color: var(--color-text-light);
  border: none;
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--border-radius);
  cursor: pointer;
  margin-left: var(--space-md);
  transition: background-color var(--transition-duration);
}

.remove-button:hover {
  background-color: var(--color-primary-hover);
}

.item {
  margin-top: var(--space-xl);
  display: flex;
  position: relative;
}

.details {
  flex: 1;
  margin-left: var(--space-md);
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: var(--space-xs);
  color: var(--color-text-light);
}
</style>
