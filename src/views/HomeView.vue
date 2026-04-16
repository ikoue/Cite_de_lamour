<template>
  <div class="home-view">
    <section class="hero" id="heroSection">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="hero-title-part" data-part="1">LÀ OÙ</span>
          <span class="hero-title-part" data-part="2">L'AMOUR TRANSFORME</span>
          <span class="hero-title-part" data-part="3">DES VIES</span>
        </h1>
        <p class="hero-subtitle">Bienvenu(e) à la cité de l'amour</p>
      </div>
    </section>

    <section class="vision" id="vision">
      <div class="container">
        <h2 class="section-title">Notre vision</h2>
        <div class="vision-content-wrapper">
          <div class="vision-text-block">
            <p class="vision-main-text">
              NOTRE VISION EST DE VOIR LE QUÉBEC TRANSFORMÉ PAR L'AMOUR DE JÉSUS-CHRIST EN PROCLAMANT AVEC PASSION L'ÉVANGILE, VIVANT UNE COMMUNION FRATERNELLE SINCÈRE ET EN SERVANT NOTRE PROCHAIN AVEC PASSION ET GÉNÉROSITÉ.
            </p>
            <router-link to="/se-joindre" class="vision-cta-btn">
              <i class="fas fa-heart"></i> JOINS-TOI À NOUS
            </router-link>
          </div>
          <div class="vision-images-grid">
            <div class="vision-image-card image-1">
              <img src="/visionremplacement1.jpeg" alt="Notre vision">
            </div>
            <div class="vision-image-card image-2">
              <img src="/visionremplacement2.jpeg" alt="Notre vision">
            </div>
            <div class="vision-image-card image-3">
              <img src="/notrevision3.jpg" alt="Notre vision">
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="events" id="evenements">
      <div class="container">
        <h2 class="section-title">Nos événements</h2>
        <div class="carousel-wrapper" :class="{ 'single-event': eventsToShow.length === 1 }">
          <button
            type="button"
            class="carousel-btn prev-btn"
            aria-label="Événements précédents"
            @click="prevEvent"
          >
            <i class="fas fa-chevron-left"></i>
          </button>
          <div
            class="carousel-container"
            id="eventsCarousel"
            :style="carouselStyle"
          >
            <EventCard
              v-for="ev in eventsToShow"
              :key="ev.id"
              :event="ev"
              :single="eventsToShow.length === 1"
            />
          </div>
          <button
            type="button"
            class="carousel-btn next-btn"
            aria-label="Événements suivants"
            @click="nextEvent"
          >
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>

    <section class="programs" id="programs">
      <div class="container">
        <h2 class="section-title">Nos programmes</h2>
        <div class="programs-grid" id="programsGrid">
          <div
            v-for="program in programs"
            :key="program.id"
            class="program-item"
            :class="{ 'program-item-celebration': isCelebration(program.name) }"
          >
            <div class="program-icon-wrapper">
              <div class="program-icon">
                <template v-if="isCelebration(program.name)">
                  <div class="program-icon-partitions" aria-hidden="true">
                    <span class="partitions-line">♪</span>
                    <span class="partitions-line">♫</span>
                    <span class="partitions-line">♪</span>
                  </div>
                </template>
                <i v-else :class="programIcon(program.icon)"></i>
              </div>
            </div>
            <div class="program-content">
              <h3 class="program-name">{{ program.name }}</h3>
              <div class="program-details">
                <div class="program-detail-item">
                  <i class="fas fa-calendar-day"></i>
                  <span class="program-day">{{ program.day }}</span>
                </div>
                <div class="program-detail-item">
                  <i class="fas fa-clock"></i>
                  <span class="program-time">{{ program.time }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="departments" id="departements">
      <div class="container">
        <h2 class="section-title">Nos départements</h2>
        <div class="departments-grid" id="departmentsGrid">
          <router-link
            v-for="dept in departments"
            :key="dept.id || dept.slug"
            :to="`/departement/${dept.slug}`"
            class="department-card"
          >
            <div class="department-card-image" v-if="dept.image">
              <img :src="`/${dept.image}`" :alt="dept.name">
            </div>
            <div class="department-card-content">
              <h3 class="department-card-title">{{ dept.name }}</h3>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import EventCard from '@/components/EventCard.vue'
import {
  buildDefaultChurchEvents,
  getUpcomingSpecialChurchEvents,
  mergeRecurringAndSpecialEvents,
  isWednesdayFebruaryEvent,
} from '@/composables/useChurchEvents'

const eventsIndex = ref(0)
const programs = ref([])
const departments = ref([])

const eventsToShow = computed(() => {
  const recurring = buildDefaultChurchEvents(1)
  const specials = getUpcomingSpecialChurchEvents()
  return mergeRecurringAndSpecialEvents(recurring, specials).filter(
    (e) => !isWednesdayFebruaryEvent(e),
  )
})

const carouselStyle = computed(() => {
  if (eventsToShow.value.length <= 1 || (typeof window !== 'undefined' && window.innerWidth <= 600)) {
    return {}
  }
  const cardWidth = 280
  const gap = 20
  const offset = (cardWidth + gap) * eventsIndex.value
  return { transform: `translateX(-${offset}px)` }
})

const programIconMap = {
  church: 'fas fa-heart',
  music: 'fas fa-music',
  'book-open': 'fas fa-book-open',
  users: 'fas fa-users',
  home: 'fas fa-home',
  'user-friends': 'fas fa-user-friends',
  child: 'fas fa-child',
  pray: 'fas fa-hands-praying',
}

function programIcon(icon) {
  return programIconMap[icon] || 'fas fa-calendar'
}

function isCelebration(name) {
  return /célébration|celebration/i.test(name || '')
}

function prevEvent() {
  if (eventsToShow.value.length <= 1) return
  const carousel = document.getElementById('eventsCarousel')
  if (!carousel) return
  eventsIndex.value = (eventsIndex.value - 1 + eventsToShow.value.length) % eventsToShow.value.length
  updateCarouselPosition()
}

function nextEvent() {
  if (eventsToShow.value.length <= 1) return
  const carousel = document.getElementById('eventsCarousel')
  if (!carousel) return
  eventsIndex.value = (eventsIndex.value + 1) % eventsToShow.value.length
  updateCarouselPosition()
}

function updateCarouselPosition() {
  const carousel = document.getElementById('eventsCarousel')
  if (!carousel) return
  const cardWidth = 320
  const gap = 24
  const offset = -(eventsIndex.value * (cardWidth + gap))
  carousel.style.transform = `translateX(${offset}px)`
}

onMounted(async () => {
  try {
    const [progs, depts] = await Promise.all([
      fetch('/data/programs.json').then(r => r.json()),
      fetch('/data/departments.json').then(r => r.json()),
    ])
    programs.value = progs
    departments.value = depts.map(d => ({
      ...d,
      slug: d.slug || (d.url && d.url.replace('departement-', '').replace('.html', '')) || String(d.id),
    }))
  } catch {
    programs.value = [
      { id: 1, name: 'Cultes de célébration', day: 'Dimanche', icon: 'church', time: 'de 9h30 à 11h45' },
      { id: 2, name: "Cultes d'enseignement", day: 'Vendredi', icon: 'book-open', time: 'de 18h30 à 20h30' },
      { id: 3, name: "École Biblique de l'Amour", day: 'Mardi', icon: 'users', time: 'de 19h à 20h30' },
      { id: 4, name: 'Rencontres Hommes/Femmes', day: 'Mercredi (1 sur 2)', icon: 'user-friends', time: 'de 19h à 20h30' },
    ]
    departments.value = []
  }
})
</script>
