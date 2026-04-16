<template>
  <div class="app">
    <AppHeader @toggle-menu="menuOpen = !menuOpen" />
    <DropdownMenu :open="menuOpen" @close="menuOpen = false" />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import DropdownMenu from '@/components/DropdownMenu.vue'

const menuOpen = ref(false)
watch(menuOpen, (open) => {
  document.body.classList.toggle('menu-open', open)
})
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.main-content {
  flex: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
