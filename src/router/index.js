import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { title: "Accueil - Cité de l'amour" },
    },
    {
      path: '/commencer-ici',
      name: 'commencer-ici',
      component: () => import('@/views/CommencerIciView.vue'),
      meta: { title: "Commencer ici - Cité de l'amour" },
    },
    {
      path: '/se-joindre',
      name: 'se-joindre',
      component: () => import('@/views/SeJoindreView.vue'),
      meta: { title: "Se joindre - Cité de l'amour" },
    },
    {
      path: '/nouveaux-convertis',
      name: 'nouveaux-convertis',
      component: () => import('@/views/NouveauxConvertisView.vue'),
      meta: { title: "Marcher avec Christ - Cité de l'amour" },
    },
    {
      path: '/faire-un-don',
      name: 'faire-un-don',
      component: () => import('@/views/FaireUnDonView.vue'),
      meta: { title: "Faire un don - Cité de l'amour" },
    },
    // Départements
    {
      path: '/departement/:slug',
      name: 'departement',
      component: () => import('@/views/DepartementView.vue'),
      meta: { title: "Département - Cité de l'amour" },
    },
  ],
})

router.beforeEach((to) => {
  if (to.meta?.title) {
    document.title = to.meta.title
  }
})

export default router
