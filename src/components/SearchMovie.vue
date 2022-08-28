<template>
  <main class="container">
    <div class="columns">

      <div class="column">
        <div id="left-autocomplete"></div>
        <div id="left-summary"></div>
      </div>
    
      <div class="column">
        <div id="right-autocomplete"></div>
        <div id="right-summary"></div>
      </div>

    </div>

    <div class="column is-half notification is-primary tutorial">
      <h1 class="title">Search For a Movie on Both Sides</h1>
      <p class="subtitle">We will tell you which is best!</p>
    </div>

  </main>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { createAutoComplete } from '../utils/autocomplete'
  import { fetchData, onMovieSelect } from '../api/api'

  onMounted(() => {
    const autocompleteConfig = {
      renderOption: (movie) => {
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster
        return `
          <img src="${imgSrc}" />
          ${movie.Title} (${movie.Year})
        `
      },
      fetchApi: (endpoint, searchTerm) => {
        return fetchData(endpoint, searchTerm)
      },
      inputValue: (movie) => {
        return movie.Title
      }
    }

    createAutoComplete({
      ...autocompleteConfig,
      autocompleteDiv: document.querySelector('#left-autocomplete'),
      onOptionSelect: (movie) => {
        document.querySelector('.tutorial').classList.add('is-hidden')
        onMovieSelect(movie, document.querySelector('#left-summary'), 'left')
      },
    })

    createAutoComplete({
      ...autocompleteConfig,
      autocompleteDiv: document.querySelector('#right-autocomplete'),
      onOptionSelect: (movie) => {
        document.querySelector('.tutorial').classList.add('is-hidden')
        onMovieSelect(movie, document.querySelector('#right-summary'), 'right')
      },
    })
  })

</script>