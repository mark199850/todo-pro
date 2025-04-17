<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Calendar from './components/Calendar.vue'

defineProps<{
  msg: string
}>()
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <div class="title">
        <h1 class="green">ToDo Pro</h1>
        <h3>Select a date to view and manage your todos</h3>
        <Calendar />
      </div>
      <nav>
        <RouterLink to="/">ToDo List</RouterLink>
        <RouterLink to="/weather">Weather</RouterLink>
      </nav>
    </div>
  </header>

  <div class="view-container">
    <router-view v-slot="{ Component, route }">
      <transition name="slide-fade">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </div>
</template>

<style>
:root {
  /* Transition customization variables */
  --transition-duration: 0.3s;
  --transition-easing: cubic-bezier(1, 0, 0, 1.2); /* Default is a nice easeOutQuart */
  --slide-distance: -200px;
  --fade-start-opacity: 0;
}
</style>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.title h1,
.title h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .title h1,
  .title h3 {
    text-align: left;
  }
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.view-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* Slide-fade transition styles using CSS variables */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all var(--transition-duration) var(--transition-easing);
  position: absolute;
}

.slide-fade-enter-from {
  opacity: var(--fade-start-opacity);
  transform: translateY(var(--slide-distance));
}

.slide-fade-leave-to {
  opacity: var(--fade-start-opacity);
  transform: translateY(calc(-1 * var(--slide-distance)));
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

.view-container {
  position: relative;
  min-height: 400px; /* Adjust based on your content */
}
</style>
