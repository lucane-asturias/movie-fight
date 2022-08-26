<template>
  <Header />
  <div class="container">
    <div class="autocomplete"></div>
    <div class="autocomplete-two"></div>
    <div class="autocomplete-three"></div>
    <div id="summary"></div>
  </div>
</template>

<script setup>
  import { onMounted } from 'vue'

  import Header from './components/Header.vue'
  import { createAutoComplete } from './utils/autocomplete'

  onMounted(() => {
    createAutoComplete({
      autocompleteDiv: document.querySelector('.autocomplete')
    })

    createAutoComplete({
      autocompleteDiv: document.querySelector('.autocomplete-two')
    })

    createAutoComplete({
      autocompleteDiv: document.querySelector('.autocomplete-three')
    })
  })

// http://www.omdbapi.com/?apikey=3486c1a5&s=avengers

</script>

<style>
  /*html {
    background-color: black;
    color: white;
  }*/
</style>
