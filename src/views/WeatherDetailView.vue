<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchWeatherByCityId, fetchForecastByCityId } from '../api/weatherApi.js'
import { useTemperature } from '../composables/useTemperature.js'
import ForecastList from '../components/exercise/ForecastList.vue'

const route = useRoute()
const cityInfo = ref(null)
const forecast = ref([])
const isLoading = ref(false)
const errorMessage = ref('')

const { unitSymbol, toDisplay } = useTemperature()

const displayTemp = computed(() => toDisplay(cityInfo.value?.temp))

onMounted(async () => {
    isLoading.value = true
    errorMessage.value = ''
    try {
        // 현재 날씨와 예보를 동시에 요청한다.
        const [current, days] = await Promise.all([
            fetchWeatherByCityId(route.params.cityId),
            fetchForecastByCityId(route.params.cityId),
        ])
        cityInfo.value = current
        forecast.value = days
    } catch (error) {
        errorMessage.value = '날씨 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'
        console.error('[상세 날씨 조회 실패]', error)
    } finally {
        isLoading.value = false
    }
})
</script>

<template>
    <div class="weather-detail">
        <h1>지역 상세 기상 관측 정보</h1>

        <p v-if="isLoading">날씨 정보를 불러오는 중...</p>
        <p v-else-if="errorMessage" class="error">{{ errorMessage }}</p>
        <div v-else-if="cityInfo">
            <p>지역: 대한민국 {{ cityInfo.name }}</p>
            <p>날씨: {{ cityInfo.description }}</p>
            <p>현재 기온: {{ displayTemp }}{{ unitSymbol }}</p>
            <p>습도: {{ cityInfo.humidity }}%</p>
            <p>풍속: {{ cityInfo.windSpeed }}m/s</p>

            <h2>5일 예보</h2>
            <ForecastList :days="forecast" />
        </div>
        <p v-else>해당 도시 정보를 찾을 수 없습니다.</p>

        <RouterLink to="/">← 메인 대시보드로 돌아가기</RouterLink>
    </div>
</template>

<style scoped>
.weather-detail {
    max-width: 500px;
}

.error {
    color: #c0392b;
}
</style>
