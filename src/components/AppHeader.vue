<template>
  <header class="header department-header-transparent">
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <router-link to="/">
            <img src="/logo.png" alt="Cité de l'amour Logo" class="logo-image">
          </router-link>
        </div>
        <nav class="nav">
          <router-link to="/commencer-ici" class="nav-link">Commencer ici</router-link>
          <router-link to="/se-joindre" class="nav-link">Se joindre à nous</router-link>
          <a href="#" class="nav-link menu-toggle" @click.prevent="$emit('toggle-menu')">
            Menu <i class="fas fa-bars"></i>
          </a>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
defineEmits(['toggle-menu'])
</script>
