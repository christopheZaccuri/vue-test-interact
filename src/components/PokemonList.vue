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
        init() {
            this.fetchPokemonNames.then(()=>{
                for (let index = 0; index < this.indexToLoad; index++) {
                    this.getPokemons(this.pokemonNameArray[index].name)
                }
            })
        },
        getPokemons(pokemonName) {
            console.log(this.filteredPokemon)
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
                    if(value.name.includes(e.target.value, 0)){
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
                this.init()
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