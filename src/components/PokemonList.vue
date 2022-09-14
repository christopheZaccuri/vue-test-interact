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
            indexToLoad: 20,
            tabFilter: []
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
                    this.indexToLoad = this.indexToLoad+20
                    this.getPokemons(this.pokemonNameArray.slice(this.indexToLoad, this.indexToLoad+20))
                }
            }
        }
    },
    methods: {
        getPokemons(pokemonArray) {
            if(this.filteredPokemon.length > 0) {

                this.pokemonDetailsArray.length=0
            }
            
            return new Promise((resolve, reject) => {
                if(pokemonArray.length>0){
                    resolve()
                } else {
                    reject('no value')
                }
            }).then(()=> {
                if(pokemonArray.length > 20) {
                    this.tabFilter = pokemonArray.slice(0, this.indexToLoad )
                } else {
                    this.tabFilter = pokemonArray
                }
                axios.all(
                    this.tabFilter.map(value => axios.get('https://pokeapi.co/api/v2/pokemon/'+value.name))
                )
                .then(response => {
                    response.forEach(element => {
                        this.pokemonDetailsArray.push(element.data)
                    });
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
                this.getPokemons(this.pokemonNameArray)
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