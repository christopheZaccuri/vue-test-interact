<template>
    {{pokemonNameArray}}
</template>

<script>
import { mapActions, mapState } from 'vuex'
import axios from 'axios'
export default {
    data() {
        return {
        }
    },
    computed: {
        ...mapActions(['fetchPokemonNames']),
        ...mapState(['pokemonNameArray', 'pokemonDetailsArray']),
    },
    created() {
        this.fetchPokemonNames.then(()=>{
            this.pokemonNameArray.forEach(pokemonName => {
                this.getPokemons(pokemonName.name)
            });
        })

    },

    methods: {
        
        getPokemons(pokemonName) {
            return new Promise((resolve, reject) => {
                if(pokemonName !== ''){
                    resolve()
                } else {
                    reject('no value')
                }
            }).then(()=> {
                axios.get('https://pokeapi.co/api/v2/pokemon/'+pokemonName) 
                .then(response => {
                    this.pokemonDetailsArray.push(response.data)
                })
                .catch((err)=> {
                    console.log(err)
                })
            }).catch((err)=> {
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>