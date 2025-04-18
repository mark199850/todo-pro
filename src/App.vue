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

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 2rem;
  text-align: center;
  margin: auto;
}

nav a.router-link-exact-active {
  color: var(--color-text-muted);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border-dark);
}

nav a:first-of-type {
  border: 0;
}

.view-container {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all var(--transition-duration) var(--transition-easing-slowstart);
  position: absolute;
  width: var(--card-width);
  max-width: 100%;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-200px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(200px);
}

@media (min-width: 1024px) {
  .title h1,
  .title h3 {
    text-align: left;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 var(--space-xl) 0 0;
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
    padding: var(--space-md) 0;
    margin-top: var(--space-md);
  }
}

@media (max-width: 1023px) {
  .wrapper {
    height: auto;
  }

  .view-container {
    display: flex;
    height: auto;
    align-items: flex-start;
    flex-wrap: wrap;
    padding-top: 2rem;
  }

  .slide-fade-enter-from {
    opacity: 0;
    transform: translateX(-200px);
  }

  .slide-fade-leave-to {
    opacity: 0;
    transform: translateX(200px);
  }
}

@media (max-width: 640px) {
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    width: 100%;
  }
}
</style>
