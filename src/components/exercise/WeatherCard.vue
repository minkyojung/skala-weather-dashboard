<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import AdviceBadge from './AdviceBadge.vue'
import { useConfigStore } from '../../stores/configStore.js'
import { useFavoriteStore } from '../../stores/favoriteStore.js'

const props = defineProps({
    city: {
        type: Object,
        required: true,
    },
})

const emit = defineEmits(['select-card', 'click-detail'])

const configStore = useConfigStore()
const { unitSymbol } = storeToRefs(configStore)

const favoriteStore = useFavoriteStore()
const { isFavorite } = storeToRefs(favoriteStore)
const { toggleFavorite } = favoriteStore

// 표시용 온도만 변환한다. 더움/선선함 판단은 아래에서 원본 city.temp를 그대로 쓴다.
const displayTemp = computed(() => {
    const rawTemp = props.city.temp
    if (configStore.unit === 'fahrenheit') {
        return Math.round((rawTemp * 9) / 5 + 32)
    }
    return rawTemp
})
</script>

<template>
    <div class="weather-card" @click="emit('select-card', city)">
        {{ city.name }} ({{ city.status }})<br />
        현재 기온: {{ displayTemp }}{{ unitSymbol }}
        <span v-if="city.temp >= 25">🔥 더움</span>
        <span v-else>❄️ 선선함</span>
        <br />
        <AdviceBadge :city="city" />
        <button @click.stop="toggleFavorite(city.id)">
            {{ isFavorite(city.id) ? '⭐' : '☆' }}
        </button>
        <button @click.stop="emit('click-detail', city)">상세보기</button>
    </div>
</template>

<style scoped>
.weather-card {
    border: 1px solid #eee;
    border-radius: 6px;
    padding: 10px;
    margin-bottom: 10px;
    cursor: pointer;
}
</style>
