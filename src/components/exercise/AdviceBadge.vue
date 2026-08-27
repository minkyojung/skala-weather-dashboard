<script setup>
import { computed } from 'vue'
import { getWeatherAdvice } from '../../utils/weatherAdvice.js'

const props = defineProps({
    city: {
        type: Object,
        required: true,
    },
})

const advice = computed(() => getWeatherAdvice(props.city))
</script>

<template>
    <span class="advice-badge">{{ advice.icon }} {{ advice.message }}</span>
</template>

<style scoped>
.advice-badge {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 12px;
    background-color: #f0f0f0;
    color: #333;
    font-size: 14px;
}
</style>
