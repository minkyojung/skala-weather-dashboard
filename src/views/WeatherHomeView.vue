<script setup>
import { ref, computed, watch, watchEffect, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import BaseDashboardCard from '../components/exercise/BaseDashboardCard.vue'
import SearchBar from '../components/exercise/SearchBar.vue'
import WeatherCard from '../components/exercise/WeatherCard.vue'
import { fetchAllWeather } from '../api/weatherApi.js'
import { useConfigStore } from '../stores/configStore.js'
import { useFavoriteStore } from '../stores/favoriteStore.js'

const router = useRouter()

const configStore = useConfigStore()
const { unitSymbol } = storeToRefs(configStore)

const favoriteStore = useFavoriteStore()
const { favoriteCount } = storeToRefs(favoriteStore)

const weatherList = ref([])
const isLoading = ref(false)
const errorMessage = ref('')
const searchQuery = ref('')
const selectedCityInfo = ref(null)

onMounted(async () => {
    isLoading.value = true
    errorMessage.value = ''
    try {
        weatherList.value = await fetchAllWeather()
    } catch (error) {
        errorMessage.value = '날씨 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'
        console.error('[날씨 조회 실패]', error)
    } finally {
        isLoading.value = false
    }
})

const filteredWeatherList = computed(() => {
    return weatherList.value.filter(city => city.name.includes(searchQuery.value))
})

const averageTemp = computed(() => {
    if (weatherList.value.length === 0) return 0
    const total = weatherList.value.reduce((sum, city) => sum + city.temp, 0)
    return total / weatherList.value.length
})

const displayAverageTemp = computed(() => {
    if (configStore.unit === 'fahrenheit') {
        return Math.round((averageTemp.value * 9) / 5 + 32)
    }
    return averageTemp.value.toFixed(1)
})

watch(selectedCityInfo, (newCity) => {
    if (newCity) {
        console.log(`[상태 변경] 선택된 도시: ${newCity.name}`)
    }
})

watchEffect(() => {
    console.log(`[검색어 변경] searchQuery: "${searchQuery.value}"`)
})

const handleUpdateQuery = (newQuery) => {
    searchQuery.value = newQuery
}

const handleSelectCard = (city) => {
    selectedCityInfo.value = city
}

const handleClickDetail = (city) => {
    router.push('/weather/' + city.id)
}
</script>

<template>
    <div class="weather-home">
        <h1>날씨 대시보드</h1>

        <BaseDashboardCard title="도시 검색">
            <SearchBar :search-query="searchQuery" @update-query="handleUpdateQuery" />
        </BaseDashboardCard>

        <p v-if="selectedCityInfo">{{ selectedCityInfo.name }}이 선택되었습니다.</p>
        <p>평균 기온 : {{ displayAverageTemp }}{{ unitSymbol }}</p>
        <p>⭐ 즐겨찾기: {{ favoriteCount }}개</p>

        <BaseDashboardCard title="지역별 날씨 현황">
            <p v-if="isLoading">날씨 정보를 불러오는 중...</p>
            <p v-else-if="errorMessage" class="error">{{ errorMessage }}</p>
            <template v-else-if="searchQuery === ''">
                <WeatherCard
                    v-for="city in weatherList"
                    :key="city.id"
                    :city="city"
                    @select-card="handleSelectCard"
                    @click-detail="handleClickDetail"
                />
            </template>
            <template v-else-if="filteredWeatherList.length > 0">
                <WeatherCard
                    v-for="city in filteredWeatherList"
                    :key="city.id"
                    :city="city"
                    @select-card="handleSelectCard"
                    @click-detail="handleClickDetail"
                />
            </template>
            <p v-else>검색 결과가 일치하는 도시가 없습니다.</p>
        </BaseDashboardCard>
    </div>
</template>

<style scoped>
.weather-home {
    max-width: 500px;
}

.error {
    color: #c0392b;
}
</style>
