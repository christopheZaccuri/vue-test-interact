<script>
import PokemonListVue from './PokemonList.vue';
export default {
    components: {
        PokemonListVue
    },
    data() {
        return {

        }
    },
    methods: {

    }
    
}
</script>

<template>
    <div>
        <input type="text" class="searchPokemon">
        <div class="pokemon-list">
        <PokemonListVue />
    </div>
    </div>
    
</template>
<style scoped>
    .pokemon-list {
        display: flex;
        flex-wrap: wrap;
    }
    ul {
        background: #eee;
        padding: 20px;
        border-radius: 20px;
        margin: 10px;
    }
    li {
        list-style-type: none;
    }
</style>