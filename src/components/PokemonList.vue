<template>
    <div class="team">
        <poketeam />
    </div>
    <input @input="searchPokemon" type="text" class="searchPokemon" />
    <div class="pokemon-list">
        <div class="loading" v-if="loading"><img src="@/assets/loader.gif" alt=""></div>
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
            <li><input @click="pushPokemonIntoTeam(pokemon)" type="button" value="add to team"></li>
        </ul>
    </div>
    
    
</template>

<script>
import { mapActions, mapState } from 'vuex'
import axios from 'axios'
import pokeTeam from '@/components/PokeTeam.vue'
export default {
    data() {
        return {
            filteredPokemon: [],
            indexToLoad: 20,
            tabFilter: [],
            loading : false
        }
    },
    components: {
        'poketeam': pokeTeam
    },
    computed: {
        
        ...mapState(['pokemonNameArray', 'pokemonDetailsArray', 'team']),
        ...mapActions(['fetchPokemonNames']),
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
        ...mapActions(['pushPokemonIntoTeam']),
        getPokemons(pokemonArray) {
            if(this.filteredPokemon.length > 0) {

                this.pokemonDetailsArray.length=0
            }
            
            return new Promise((resolve, reject) => {
                if(pokemonArray.length>0){
                    this.loading = true
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
                    this.loading = false
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
                this.getPokemons(this.filteredPokemon);

            } else {
                this.filteredPokemon.length = 0
                this.pokemonDetailsArray.length=0
                this.init()
            }
        },

        init() {
            this.pokemonDetailsArray.length=0
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
    .loading {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,0.2);
        color: #fff;
        z-index: 2;
    }
    .loading img {
        position: absolute;
        top: 50%;
        left: 35%;
        width: 20%;
    }
    .team {
        background: #eee;
        top: 0;
        right: 0;
        width: 100%;
        padding: 20px;
    }
</style>