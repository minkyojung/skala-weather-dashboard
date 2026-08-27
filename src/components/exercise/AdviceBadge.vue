<script setup>
import { computed } from 'vue'
import { Badge } from '@/components/ui/badge'
import { getWeatherAdvice } from '@/utils/weatherAdvice.js'

const props = defineProps({
    city: {
        type: Object,
        required: true,
    },
})

const advice = computed(() => getWeatherAdvice(props.city))
</script>

<template>
    <Badge variant="secondary" class="font-normal">
        {{ advice.icon }} {{ advice.message }}
    </Badge>
</template>
