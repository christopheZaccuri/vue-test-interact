<script>

export default {
    props: {
      pokemon: Object
    }
}
</script>

<template>
    <ul>
        <li><img :src=pokemon.sprites.back_default></li>
        <li class="name">{{pokemon.name}}</li>
    </ul>
</template>
<style scoped>
    li {
        list-style-type: none;
    }
</style>