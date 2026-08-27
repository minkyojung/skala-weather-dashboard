<script setup>
import { ref, computed, watch, watchEffect } from 'vue'
import BaseDashboardCard from './components/exercise/BaseDashboardCard.vue'
import SearchBar from './components/exercise/SearchBar.vue'
import WeatherCard from './components/exercise/WeatherCard.vue'
import { weatherData } from './mock/weatherData.js'

const weatherList = ref(weatherData)

const searchQuery = ref('')
const selectedCityInfo = ref(null)

const filteredWeatherList = computed(() => {
    return weatherList.value.filter(city => city.name.includes(searchQuery.value))
})

const averageTemp = computed(() => {
    const total = weatherList.value.reduce((sum, city) => sum + city.temp, 0)
    return (total / weatherList.value.length).toFixed(1)
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
    window.alert(`${city.name}의 날씨는 ${city.status}입니다.`)
}
</script>

<template>
    <div class="weather-parent">
        <h1>날씨 (컴포넌트)</h1>

        <BaseDashboardCard title="도시 검색">
            <SearchBar :search-query="searchQuery" @update-query="handleUpdateQuery" />
        </BaseDashboardCard>

        <p v-if="selectedCityInfo">{{ selectedCityInfo.name }}이 선택되었습니다.</p>
        <p>평균 기온 : {{ averageTemp }}도</p>

        <BaseDashboardCard title="지역별 날씨 현황">
            <template v-if="searchQuery === ''">
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
.weather-parent {
    max-width: 500px;
}
</style>
