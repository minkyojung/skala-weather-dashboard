<script setup>
import { computed } from 'vue'
import { Umbrella, Shirt, Sun } from '@lucide/vue'
import { Badge } from '@/components/ui/badge'
import { getWeatherAdvice } from '@/utils/weatherAdvice.js'

const props = defineProps({
    city: {
        type: Object,
        required: true,
    },
})

const ICONS = {
    umbrella: Umbrella,
    jacket: Shirt,
    good: Sun,
}

const advice = computed(() => getWeatherAdvice(props.city))
const icon = computed(() => ICONS[advice.value.type] ?? Sun)
</script>

<template>
    <Badge variant="secondary" class="gap-1.5 font-normal">
        <component :is="icon" class="size-3.5" />
        {{ advice.message }}
    </Badge>
</template>
