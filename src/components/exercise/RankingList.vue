<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useConfigStore } from '../../stores/configStore.js'

const props = defineProps({
    title: { type: String, required: true },
    cities: { type: Array, required: true },
    // 온도 대신 다른 값을 강조해야 할 때 쓴다. (예: 오늘 최고기온)
    tempKey: { type: String, default: 'temp' },
    // 현지 시각과 현재 날씨는 '지금 기온'을 보여줄 때만 의미가 있다.
    // 오늘 최고기온 옆에 붙이면 다른 시각의 정보라 오해를 부른다.
    showNow: { type: Boolean, default: true },
})

const configStore = useConfigStore()
const { unitSymbol } = storeToRefs(configStore)

const rows = computed(() =>
    props.cities.map(city => {
        const rawTemp = city[props.tempKey]
        const temp =
            configStore.unit === 'fahrenheit'
                ? Math.round((rawTemp * 9) / 5 + 32)
                : rawTemp
        return { ...city, shownTemp: temp }
    }),
)
</script>

<template>
    <div class="ranking">
        <h3>{{ title }}</h3>
        <ol>
            <li v-for="city in rows" :key="city.name">
                <span class="name">{{ city.name }}</span>
                <span v-if="showNow" class="meta">{{ city.status }} · 현지 {{ city.localTime }} {{ city.isDay ? '☀️' : '🌙' }}</span>
                <span v-else class="meta">{{ city.country }}</span>
                <span class="temp">{{ city.shownTemp }}{{ unitSymbol }}</span>
            </li>
        </ol>
    </div>
</template>

<style scoped>
.ranking {
    margin-bottom: 20px;
}

.ranking h3 {
    font-size: 15px;
    margin-bottom: 6px;
}

.ranking ol {
    margin: 0;
    padding-left: 20px;
}

.ranking li {
    display: flex;
    align-items: baseline;
    gap: 8px;
    padding: 4px 0;
    border-bottom: 1px solid #eee;
}

.name {
    font-weight: 600;
}

.meta {
    font-size: 12px;
    color: #777;
}

.temp {
    margin-left: auto;
    font-variant-numeric: tabular-nums;
}
</style>
