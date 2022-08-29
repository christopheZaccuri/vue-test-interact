<script>
import { mapGetters, mapState } from 'vuex'

export default {
    computed: {
        ...mapGetters(['getPokemons']),
        ...mapState(['pokemonArray'])
    }
    
}
</script>

<template>
    <div>
        <ul v-for="pokemon in pokemonArray" :key="pokemon.id">
            <li>{{pokemon.name}}</li>
        </ul>
    </div>
</template>
<style scoped>
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