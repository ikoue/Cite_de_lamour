/**
 * Logique des événements par défaut (cultes dimanche / vendredi)
 * Réutilisable dans les composants Vue
 */

const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
const DAYS = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']

function getNextWeekday(targetDay, hour, minute) {
  const now = new Date()
  let daysToAdd = (targetDay - now.getDay() + 7) % 7
  const candidate = new Date(now)
  candidate.setHours(hour, minute, 0, 0)
  if (daysToAdd === 0 && candidate <= now) daysToAdd = 7
  const next = new Date(now)
  next.setDate(now.getDate() + daysToAdd)
  next.setHours(hour, minute, 0, 0)
  return next
}

function getNextOccurrences(targetDay, hour, minute, count) {
  const dates = []
  let d = getNextWeekday(targetDay, hour, minute)
  for (let i = 0; i < count; i++) {
    dates.push(new Date(d))
    d.setDate(d.getDate() + 7)
  }
  return dates
}

export function buildDefaultChurchEvents(weeksAhead = 4) {
  const sundays = getNextOccurrences(0, 9, 30, weeksAhead)
  const fridays = getNextOccurrences(5, 18, 30, weeksAhead)
  const sundayEvents = sundays.map((date, i) => ({
    id: `culte-celebration-${i}`,
    name: 'Culte de célébration',
    time: '9h30 à 11h45',
    description: "Temps de louange, d'adoration et de communion fraternelle.",
    image: '/Culte de celebration.jpg',
    fullDate: date,
  }))
  const fridayEvents = fridays.map((date, i) => ({
    id: `culte-enseignement-${i}`,
    name: "Culte d'enseignement",
    time: '18h30 à 20h30',
    description: 'Enseignement biblique et croissance spirituelle.',
    image: "/culte d'enseignement.jpg",
    fullDate: date,
  }))
  return [...sundayEvents, ...fridayEvents].sort((a, b) => a.fullDate - b.fullDate)
}

const PENTECOTE_2026_DATE = new Date(2026, 4, 24, 9, 30, 0)

/** Culte spécial Pentecôte — dimanche 24 mai 2026 */
export function getUpcomingSpecialChurchEvents() {
  const out = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const endOfDay = new Date(PENTECOTE_2026_DATE)
  endOfDay.setHours(23, 59, 59, 999)
  if (today <= endOfDay) {
    out.push({
      id: 'culte-special-pentecote-2026',
      name: 'Culte spécial Pentecôte',
      time: '9h30 à 11h45',
      description: 'Culte spécial pour la fête de la Pentecôte.',
      image: '/SPECIAL CULTE PENTECOTE.jpg',
      fullDate: new Date(PENTECOTE_2026_DATE),
    })
  }
  return out
}

export function mergeRecurringAndSpecialEvents(recurring, specials) {
  const specialDayKeys = new Set(
    specials.map((s) => {
      const d = s.fullDate
      return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
    }),
  )
  const filtered = recurring.filter((e) => {
    if (e.name !== 'Culte de célébration' || !e.fullDate) return true
    const d = e.fullDate
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
    return !specialDayKeys.has(key)
  })
  return [...filtered, ...specials].sort((a, b) => a.fullDate - b.fullDate)
}

export function formatDateForEvent(date) {
  const d = date instanceof Date ? date : new Date(date)
  return `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

export function isWednesdayFebruaryEvent(event) {
  if (event.fullDate) {
    const d = event.fullDate
    return d.getDay() === 3 && d.getMonth() === 1
  }
  const day = parseInt(event.date, 10)
  if (isNaN(day)) return false
  return [5, 12, 19, 26].includes(day)
}

export function formatTimeRange(timeStr) {
  if (!timeStr) return ''
  return timeStr.includes(' à ') || timeStr.includes('h') ? `de ${timeStr}` : `de ${timeStr}`
}
