<template>
    <h2>My team</h2>
    <div class="teamList">
        <div class="teamList__pokemon" v-for="pokemon in team" :key="pokemon.id">
            <p><img :src="pokemon.sprites.front_default" alt=""></p>
            <p>{{pokemon.name}}</p>     
            <p @click="removePokemonFromTeam(pokemon)">Remove</p> 
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    data () {
        return {
            
        }
    },
    computed: {
        ...mapState(['team'])
        
    },
    methods: {
        ...mapActions(['removePokemonFromTeam'])
    }
}
</script>

<style scoped>
    .teamList {
        display: flex;
    }
    .teamList__pokemon {
        list-style-type: none;
    }
    .teamList__pokemon p {
        text-align: center;
    }
</style>