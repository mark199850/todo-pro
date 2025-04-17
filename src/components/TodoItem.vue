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
    <button class="removeButton" @click="$emit('remove')">X</button>
  </div>
</template>

<style scoped>
input {
  accent-color: hsla(160, 100%, 37%, 1);
}
.removeButton {
  background-color: hsla(160, 100%, 37%, 1);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  margin-left: 1rem;
}
.item {
  margin-top: 2rem;
  display: flex;
  position: relative;
}

.details {
  flex: 1;
  margin-left: 1rem;
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

@media (min-width: 1024px) {
  .item {
    margin-top: 0;
    padding: 0.4rem 0 1rem 0;
  }

  i {
    top: calc(50% - 25px);
    left: -26px;
    position: absolute;
    border: 1px solid var(--color-border);
    background: var(--color-background);
    border-radius: 8px;
    width: 50px;
    height: 50px;
  }

  .item:before {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:after {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:first-of-type:before {
    display: none;
  }

  .item:last-of-type:after {
    display: none;
  }
}
</style>
