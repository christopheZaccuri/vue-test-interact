<script>

export default {
    props: {
      pokemonProp: Object
    }
}
</script>

<template>
        <ul>
            <li class="name"><h2>{{pokemonProp.name}}</h2></li>
            <li class="image"><img :src=pokemonProp.sprites.front_default /></li>
            
        </ul>    
</template>
<style scoped>
    ul {
        background: #eee;
        padding: 20px;
        border-radius: 20px;
        margin: 10px;
    }
    li {
        list-style-type: none;
    }
</style>