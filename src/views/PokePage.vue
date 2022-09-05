<script>
    import Pokedex from "@/components/Pokedex.vue";
    export default {
      
      data() {
        return {
        }
      },
      components: {
        'pokedex': Pokedex
      },
      methods: {
       
      },
      created() {
      },
      
    }
</script>

<template>
<div class="pokelist">
  <pokedex />
</div>
  
</template>

<style>
  .pokelist {
    display: flex;
    flex-wrap: wrap;
  }
</style>