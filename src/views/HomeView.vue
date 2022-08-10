<script>
import Pokedex from '@/components/Pokedex.vue'
export default {
    data() {
        return {
            pokemons: [],
            pokemonsDetails: []
        }
    },
    components: {
      'pokedex': Pokedex
    },
    methods: {
        async fetchPokemon() {
            const res = await fetch('https://pokeapi.co/api/v2/pokemon/');
            const data = await res.json();
            this.pokemons = data.results;
            
        },
        async fetchPokemonsDetails() {
            await this.fetchPokemon();
            this.pokemons.forEach(async pokemon => {
                const resDetails = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
                const dataDetails = await resDetails.json();
                this.pokemonsDetails.push(dataDetails)
            });
        }
    },
    created() {
        this.fetchPokemonsDetails();
    }
}
</script>

<template>
  <main>
    <pokedex v-for="pokemonDetails in pokemonsDetails" :pokemon="pokemonDetails" :key="pokemonDetails.id" />
  </main>
</template>

<style scoped>
  main {
    display: flex;
    flex-wrap: wrap;
  }
</style>
