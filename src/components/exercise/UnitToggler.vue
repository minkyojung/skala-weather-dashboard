<script setup>
import { useTemperature } from '../../composables/useTemperature.js'
import { useConfigStore } from '../../stores/configStore.js'

const { unitSymbol } = useTemperature()
const { toggleUnit } = useConfigStore()
</script>

<template>
    <div class="flex shrink-0 items-center gap-2 whitespace-nowrap text-xs">
        <span>날씨단위: {{ unitSymbol }}</span>
        <button
            type="button"
            class="shrink-0 rounded border px-2.5 py-1 hover:bg-black/5"
            @click="toggleUnit"
        >
            단위변경
        </button>
    </div>
</template>
