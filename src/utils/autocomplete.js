import { debounce } from './debounce.js'

export const createAutoComplete = ({ autocompleteDiv, renderOption, onOptionSelect, inputValue, fetchApi }) => {
  autocompleteDiv.innerHTML = `
    <label><b>Search</b></label>
    <input class="input" />
    <div class="dropdown">
      <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
      </div>
    </div>
  `

  const input = autocompleteDiv.querySelector('input')
  const dropdown = autocompleteDiv.querySelector('.dropdown')
  const resultsWraper = autocompleteDiv.querySelector('.results')

  const onInput = async e => { 
    const omdbEndpoint = 'http://www.omdbapi.com/'
    const items = await fetchApi(omdbEndpoint, e.target.value)
    console.log('items', items)

    if (!items.length) {
      dropdown.classList.remove('is-active')
      return
    }

    resultsWraper.innerHTML = ''
    dropdown.classList.add('is-active')

    for (let item of items) {
      const option = document.createElement('a')
      option.classList.add('dropdown-item')

      option.innerHTML = renderOption(item)

      option.addEventListener('click', () => {
        dropdown.classList.remove('is-active')
        input.value = inputValue(item)
        onOptionSelect(item)
      })

      resultsWraper.appendChild(option)
    }
  }
  input.addEventListener('input', debounce(onInput, 3000))

  document.addEventListener('click', e => {
    if (!autocompleteDiv.contains(event.target)) {
      dropdown.classList.remove('is-active')
    }
  })
}