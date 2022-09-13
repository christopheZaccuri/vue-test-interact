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
            <li><router-link 
            :to="{
                name:'pokemon-details', 
                params:{ 
                    pokemonname: pokemon.name,
                    pokemonAll: JSON.stringify(pokemon)
                    }
            }">more details</router-link>   </li>
        </ul>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import axios from 'axios'
import router from '@/router'
export default {
    data() {
        return {
            filteredPokemon: [],
            indexToLoad: 20
        }
    },
    computed: {
        ...mapActions(['fetchPokemonNames']),
        ...mapState(['pokemonNameArray', 'pokemonDetailsArray']),
        
        
    },
    created() {
        this.init()
    },
    mounted() {
        window.onscroll = ()=> {
            if(document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight){
                if(document.querySelector('.searchPokemon').value === '') {
                    for (let index = this.indexToLoad; index < this.indexToLoad+20; index++) {
                        this.getPokemons(this.pokemonNameArray[index].name)
                    }
                    this.indexToLoad = this.indexToLoad+20
                }
                
            }
        }
    },
    methods: {
        getPokemons(pokemonName) {
            if(this.filteredPokemon.length > 0) {

                this.pokemonDetailsArray.length=0
            }
            
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
            if(e.target.value !== '') {
                this.filteredPokemon = this.pokemonNameArray.filter(function(value){
                    if(value.name.startsWith(e.target.value)){
                        return value
                    }
                })
                for (let i = 0; i < 10; i++) {
                    if(this.filteredPokemon[i]) {
                        this.getPokemons(this.filteredPokemon[i].name);
                    } 
                } 
            } else {
                this.filteredPokemon.length = 0
                this.pokemonDetailsArray.length=0
                this.init()
            }
        },
        init() {
            this.fetchPokemonNames.then(()=>{
                for (let index = 0; index < this.indexToLoad; index++) {
                    this.getPokemons(this.pokemonNameArray[index].name)
                }
            })
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