<template>
    <poketeam />
    <div class="pokemon-detail">
        <h1>{{pokemonData.name}}</h1>
        <img :src="pokemonData.sprites.front_default" alt="">
        <img :src="pokemonData.sprites.back_default" alt="">
        <ul>
            <li><h2>Height:</h2> {{pokemonData.height}}</li>
        </ul>
        <a @click="pushPokemonIntoTeam(pokemonData)" href="#">Add to Team</a>
    </div>
    <router-link to="/">Back</router-link>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import PokeTeam from '@/components/PokeTeam.vue';
    export default {
        data() {
            return {
                pokemonData: JSON.parse(this.$route.params.pokemonAll)
            };
        },
        components: {
            "poketeam": PokeTeam
        },
        methods: {
            ...mapActions(['pushPokemonIntoTeam'])
        }
    }
</script>

<style scoped>
    .pokemon-detail {
        padding: 20px;
        background: #eee;
        border-radius: 10px;
        width: auto;
    }
    h1 {
        text-transform: uppercase;
        font-weight: bold;
    }
    h2 {
        display: inline;
    }
</style>