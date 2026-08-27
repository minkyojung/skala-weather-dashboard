<script setup>
import { ref, computed, watch, watchEffect } from 'vue'

const weatherList = ref([
    {id: 'city_01', name: '서울', temp: 28, status: '맑음'},
    {id: 'city_02', name: '수원', temp: 24, status: '비'},
    {id: 'city_03', name: '부산', temp: 26, status: '구름'},
    {id: 'city_04', name: '인천', temp: 22, status: '비'},
    {id: 'city_05', name: '광주', temp: 20, status: '구름'},
    {id: 'city_06', name: '대전', temp: 18, status: '비'},
    {id: 'city_07', name: '대구', temp: 16, status: '구름'},
])

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

const showDetail = (cityName, status) => {
    window.alert(`${cityName}의 날씨는 ${status}입니다.`)
}
</script>

<template>
    <div>
        <h1>날씨 2</h1>
        <input type="text" v-model="searchQuery" placeholder="검색할 도시 이름 입력" />
        <p>검색 중인 도시 : {{ searchQuery }}</p>
        <p v-if="selectedCityInfo">{{ selectedCityInfo.name }}이 선택되었습니다.</p>
        <p>평균 기온 : {{ averageTemp }}도</p>

        <ul v-if="searchQuery === ''">
            <li v-for="city in weatherList" :key="city.id" @click="selectedCityInfo = city">
                {{ city.name }} - {{ city.temp }}도
                <span v-if="city.temp >= 25">🔥 더움 (25도 이상)</span>
                <span v-else>❄️ 선선함 (25도 미만)</span>
                <button @click.stop="showDetail(city.name, city.status)">상세보기</button>
            </li>
        </ul>
        <ul v-else-if="filteredWeatherList.length > 0">
            <li v-for="city in filteredWeatherList" :key="city.id" @click="selectedCityInfo = city">
                {{ city.name }} - {{ city.temp }}도
                <span v-if="city.temp >= 25">🔥 더움 (25도 이상)</span>
                <span v-else>❄️ 선선함 (25도 미만)</span>
                <button @click.stop="showDetail(city.name, city.status)">상세보기</button>
            </li>
        </ul>
        <p v-else>검색 결과가 일치하는 도시가 없습니다.</p>
    </div>
</template>

<style scoped>
</style>
