<script setup>
import { Button } from '@/components/ui/button'
import { useTemperature } from '@/composables/useTemperature.js'
import { useConfigStore } from '@/stores/configStore.js'

const { unitSymbol } = useTemperature()
const { toggleUnit } = useConfigStore()
</script>

<template>
    <Button variant="outline" size="sm" class="tabular-nums" @click="toggleUnit">
        {{ unitSymbol }}
    </Button>
</template>
