<script>
    import Pokedex from "@/components/Pokedex.vue";
    export default {
      
      data() {
        return {
          pokemonData : []
        }
      },
      components: {
        'pokedex': Pokedex
      },
      methods: {
        async getPokemonData() {
          const fetchPokemon = await fetch('https://pokeapi.co/api/v2/pokemon/')
          const fetchPokemonJson = await fetchPokemon.json()
          fetchPokemonJson.results.forEach(async ({name}) => {
            const fetchDetailsPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            const fetchDetailsPokemonJson = await fetchDetailsPokemon.json()
            this.pokemonData.push(fetchDetailsPokemonJson);
          });
        }
      },
      created() {
        this.getPokemonData()
      },
      
    }
</script>

<template>
<div class="pokelist">
  <pokedex v-for="pokemonDetail in pokemonData" :pokemonProp="pokemonDetail" :key="pokemonDetail" />
</div>
  
</template>

<style>
  .pokelist {
    display: flex;
    flex-wrap: wrap;
  }
</style>