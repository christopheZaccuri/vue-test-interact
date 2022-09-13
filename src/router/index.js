import { createRouter, createWebHistory } from 'vue-router'
import PokePage from '@/views/PokePage.vue'
import PokePageDetails from '@/views/PokePageDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'pokemon-page',
      component: PokePage
    },
    {
      path: '/:pokemonname',
      name: 'pokemon-details',
      component: PokePageDetails
    },
  ]
})

export default router
