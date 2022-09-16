import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
	pokemonNameArray: [],
	pokemonDetailsArray: [],
	pokemonLink: [],
	team: []
  },
  getters: {
	
  },
  mutations: {
	GET_POKEMONS(state, response) {
		response.forEach(pokemon => {
			state.pokemonNameArray.push(pokemon)
		});
	},
	PUSH_TEAM_POKEMON(state, data){
		state.team.push(data)
	},
	REMOVE_TEAM_POKEMON(state, data){
		const filter = state.team.filter(value=> {
			return value !== data
		})
		state.team = [...filter]
	}
  },
  actions: {
	fetchPokemonNames({commit}) {
		return new Promise((resolve)=> {
			axios.get('https://pokeapi.co/api/v2/pokemon?limit=-1') 
			.then(response => {
				commit('GET_POKEMONS', response.data.results)
				resolve()
			})
		}).then(()=> {
			console.log('fetched')
		})
		
	},
	pushPokemonIntoTeam({commit}, pokemon){
		commit('PUSH_TEAM_POKEMON', pokemon)
	},
	removePokemonFromTeam({commit}, pokemon){
		commit('REMOVE_TEAM_POKEMON', pokemon)
	}

  },
  modules: {
  }
})
