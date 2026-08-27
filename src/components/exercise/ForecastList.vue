<script setup>
import { computed } from 'vue'
import { useTemperature } from '../../composables/useTemperature.js'

const props = defineProps({
    days: {
        type: Array,
        required: true,
    },
})

const { unitSymbol, toDisplay } = useTemperature()

const displayDays = computed(() =>
    props.days.map(day => ({
        ...day,
        minTemp: toDisplay(day.minTemp),
        maxTemp: toDisplay(day.maxTemp),
    })),
)
</script>

<template>
    <ul class="forecast-list">
        <li v-for="day in displayDays" :key="day.date">
            <span class="date">{{ day.date.slice(5).replace('-', '/') }}</span>
            <img :src="`https://openweathermap.org/img/wn/${day.icon}.png`" :alt="day.status" width="32" height="32" />
            <span>{{ day.status }}</span>
            <span class="temp">{{ day.minTemp }} / {{ day.maxTemp }}{{ unitSymbol }}</span>
        </li>
    </ul>
</template>

<style scoped>
.forecast-list {
    list-style: none;
    padding: 0;
}

.forecast-list li {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 0;
    border-bottom: 1px solid #eee;
}

.date {
    width: 48px;
}

.temp {
    margin-left: auto;
}
</style>
