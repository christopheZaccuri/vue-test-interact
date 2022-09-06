<template>
    <input @input="searchPokemon" type="text" class="searchPokemon" />
    <div class="pokemon-list">
        <ul v-for="pokemon in pokemonDetailsArray" :key="pokemon.id">
            <li>
                <h2>{{pokemon.name}}</h2>
            </li>
            <li>
                <img :src="pokemon.sprites.front_default" :alt="pokemon.name">
            </li>
        </ul>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import axios from 'axios'
export default {
    data() {
        return {
            filteredPokemon: []
        }
    },
    computed: {
        ...mapActions(['fetchPokemonNames']),
        ...mapState(['pokemonNameArray', 'pokemonDetailsArray']),
    },
    created() {
        this.fetchPokemonNames.then(()=>{
            for (let index = 0; index < 20; index++) {
                this.getPokemons(this.pokemonNameArray[index].name)
                
            }
        })

    },
    updated() {

    },

    methods: {
        getPokemons(pokemonName) {
            this.pokemonDetailsArray.length=0
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
                    console.log('pokemon non reconnu '+err)
                })
            }).catch((err)=> {
                console.log(err)
            })
        },
        searchPokemon(e) {
            this.filteredPokemon = this.pokemonNameArray.filter(function(value){
                if(value.name.includes(e.target.value)){
                    return value
                }
            })
            
            for (let i = 0; i < 10; i++) {
                if(this.filteredPokemon[i]) {
                    this.getPokemons(this.filteredPokemon[i].name);
                } 
            } 
        }
    }
}
</script>

<style scoped>
    li {
        list-style-type: none;
    }
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
</style>