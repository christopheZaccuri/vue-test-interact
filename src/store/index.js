import { createStore } from 'vuex'

export default createStore({
  state: {
    urlApi: 'https://pokeapi.co/api/v2/pokemon/',
	pokemonArray: []
  },
  getters: {
	getPokemons(state) {
		fetch(state.urlApi)
		.then(response => {
			if(response.ok) {
				return response.json()
			}
		})
		.then(responseJson => {
			responseJson.results.forEach(element => {
				fetch(state.urlApi+element.name)
				.then(response => {
					if(response.ok) {
						return response.json()
					}
				})
				.then(pokemonList => {
					state.pokemonArray.push(pokemonList)
				})
			});
		})
	}
    
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
