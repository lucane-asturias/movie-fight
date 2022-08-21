<template>
  <Header />
  <div class="container">
    <input type="text">
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'

  import Header from './components/Header.vue'
  import fetchData from './api/omdb_api'

  onMounted(() => {
    const input = document.querySelector('input')
    let timeoutId

    const onInput = e => { 
      if (timeoutId) clearTimeout(timeoutId)

      timeoutId = setTimeout(() => {
        fetchData(e.target.value) 
      }, 3000)
    }

    input.addEventListener('input', onInput)
  })

// http://www.omdbapi.com/?apikey=3486c1a5&s=avengers

</script>

<style>
  html {
    background-color: black;
    color: white;
  }
</style>
