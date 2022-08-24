<template>
  <Header />
  <div class="container">
    <input type="text">
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'

  import Header from './components/Header.vue'
  import { fetchData, debounce } from './api/omdb_api'

  onMounted(() => {
    const input = document.querySelector('input')
    const onInput = e => fetchData(e.target.value) 
    input.addEventListener('input', debounce(onInput, 3000))
  })

// http://www.omdbapi.com/?apikey=3486c1a5&s=avengers

</script>

<style>
  html {
    background-color: black;
    color: white;
  }
</style>
