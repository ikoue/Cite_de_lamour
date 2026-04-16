<template>
  <div
    class="event-card-new"
    :class="{ 'single-event-card': single }"
    :data-full-image="event.image || undefined"
    @click="onCardClick"
  >
    <div class="event-image-container">
      <img
        v-if="event.image"
        :src="event.image"
        :alt="event.name"
        class="event-image-bg"
        @error="imgError = true"
      >
      <div v-if="!event.image || imgError" class="event-image-placeholder">
        <svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="160" height="80" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" rx="4"/>
          <path d="M 40 80 L 60 50 L 80 60 L 100 40 L 120 50 L 140 45 L 160 70 L 160 80 L 40 80 Z" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
          <circle cx="170" cy="30" r="8" fill="rgba(255,255,255,0.3)"/>
        </svg>
      </div>
      <div class="event-overlay-gradient"></div>
    </div>
    <div class="event-info-overlay">
      <h3 class="event-title">{{ event.name }}</h3>
      <div class="event-details">
        <div class="event-detail-item">
          <i class="fas fa-calendar"></i>
          <span class="event-date-full">{{ formattedDate }}</span>
        </div>
        <div class="event-detail-item">
          <i class="fas fa-clock"></i>
          <span class="event-time-range">{{ formattedTime }}</span>
        </div>
      </div>
      <a
        href="https://www.facebook.com/share/1KYkeJiemi/?mibextid=wwXIfr"
        target="_blank"
        rel="noopener noreferrer"
        class="event-learn-more"
        @click.stop
      >
        <span>Suis-nous en direct sur Facebook</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { formatDateForEvent, formatTimeRange } from '@/composables/useChurchEvents'

const props = defineProps({
  event: { type: Object, required: true },
  single: { type: Boolean, default: false },
})

const imgError = ref(false)

const formattedDate = computed(() => {
  if (props.event.fullDate) {
    return formatDateForEvent(props.event.fullDate)
  }
  const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
  const day = parseInt(props.event.date) || new Date().getDate()
  const today = new Date()
  const eventDate = day < today.getDate()
    ? new Date(today.getFullYear(), today.getMonth() + 1, day)
    : new Date(today.getFullYear(), today.getMonth(), day)
  return `${days[eventDate.getDay()]} ${day} ${months[eventDate.getMonth()]} ${eventDate.getFullYear()}`
})

const formattedTime = computed(() => formatTimeRange(props.event.time))

function onCardClick(e) {
  if (e.target.closest('.event-learn-more')) return
  if (props.event.image) {
    window.open(props.event.image, '_blank')
  }
}
</script>

<style scoped>
.event-card-new {
  cursor: var(--event-card-cursor, zoom-in);
}
.event-card-new[data-full-image] {
  cursor: zoom-in;
}
</style>
