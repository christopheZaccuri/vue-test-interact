<template>
</template>

<script>

export default {
    data() {
        return {
            pokemons: [],
            pokemonDetails: []
        }
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
                this.pokemonDetails.push(dataDetails)
            });
        }
    },
    created() {
        this.fetchPokemonsDetails();
    }
}
</script>

