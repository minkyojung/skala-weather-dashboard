<script setup>
import { storeToRefs } from 'pinia'
import { useConfigStore } from '../../stores/configStore.js'

const configStore = useConfigStore()
const { unitSymbol } = storeToRefs(configStore)
const { toggleUnit } = configStore
</script>

<template>
    <div class="unit-toggler">
        <span>날씨단위: {{ unitSymbol }}</span>
        <button @click="toggleUnit">단위변경</button>
    </div>
</template>

<style scoped>
.unit-toggler {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    white-space: nowrap;
}

.unit-toggler button {
    flex-shrink: 0;
    white-space: nowrap;
    padding: 4px 10px;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    cursor: pointer;
}
</style>
