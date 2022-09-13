<script>
    import PokemonList from "@/components/PokemonList.vue";
    export default {
      
      data() {
        return {
        }
      },
      components: {
        'pokemon-list': PokemonList
      },
      methods: {
       
      },
      created() {
      },
      
    }
</script>

<template>
<div class="pokelist">
  <pokemon-list />
</div>
  
</template>

<style>
  .pokelist {
    display: flex;
    flex-wrap: wrap;
  }
</style>