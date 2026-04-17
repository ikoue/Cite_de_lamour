<template>
  <div class="page-view">
    <template v-if="dept">
      <h1>{{ dept.name }}</h1>
      <p>{{ dept.description }}</p>
    </template>
    <template v-else>
      <p>Département non trouvé.</p>
    </template>
    <router-link to="/">Retour à l'accueil</router-link>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const departments = ref([])
const dept = computed(() => {
  const slug = route.params.slug
  return departments.value.find(d => {
    const u = (d.url || '').replace('departement-', '').replace('.html', '')
    return u === slug || (d.slug && d.slug === slug)
  })
})

onMounted(async () => {
  try {
    const data = await fetch('/data/departments.json').then(r => r.json())
    departments.value = data
  } catch {
    departments.value = []
  }
})
</script>
