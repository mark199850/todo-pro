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

  <RouterView />
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
</style>
