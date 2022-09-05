import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
	pokemonNameArray: [],
	pokemonDetailsArray: [],
	pokemonLink: [],
	nextUrl:''
  },
  getters: {
	
  },
  mutations: {
	GET_NEXTURL(state, response) {
		state.nextUrl = response
	},
	GET_POKEMONS(state, response) {
		response.forEach(pokemon => {
			state.pokemonNameArray.push(pokemon)
		});
	}
  },
  actions: {
	fetchPokemonNames({commit}) {
		return new Promise((resolve)=> {
			axios.get('https://pokeapi.co/api/v2/pokemon/') 
			.then(response => {
				commit('GET_NEXTURL',response.data.next)
				commit('GET_POKEMONS', response.data.results)
				resolve()
			})
		}).then(()=> {
			console.log('fetched')
		})
		
	},
  },
  modules: {
  }
})
