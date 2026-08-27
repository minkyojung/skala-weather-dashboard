<script setup>
import { ref, computed } from 'vue'

const weatherList = ref([
    {id: 'city_01', name: '서울', temp: 28, status: '맑음'},
    {id: 'city_02', name: '수원', temp: 24, status: '비'},
    {id: 'city_03', name: '부산', temp: 26, status: '구름'},
    {id: 'city_04', name: '인천', temp: 22, status: '비'},
    {id: 'city_05', name: '광주', temp: 20, status: '구름'},
    {id: 'city_06', name: '대전', temp: 18, status: '비'},
    {id: 'city_07', name: '대구', temp: 16, status: '구름'}
])

const searchCity = ref('');
const filteredWeatherList = computed(() => {
    return weatherList.value.filter(city => city.name.includes(searchCity.value));
})

const showDetail = (cityName, status) => {
    window.alert(`${cityName}의 날씨는 ${status}입니다.`);
}

const selectedCity = ref(null);
</script>

<template>
    <div>
        <h1>날씨</h1>
        <ul>
            <li v-for="city in filteredWeatherList" :key="city.id" @click="selectedCity = city">
                {{ city.name }} - {{ city.temp }}도
                <span v-if="city.temp >= 25">🔥 더움 (25도 이상)</span>
                <span v-else>❄️ 선선함 (25도 미만)</span>
                <button @click.stop="showDetail(city.name, city.status)">상세보기</button>
            </li>
        </ul>
        <br />
        <input type="text" v-model="searchCity" />
        <p>검색 중인 도시 : {{ searchCity }}</p>
        <p v-if="selectedCity">{{ selectedCity.name }}이 선택되었습니다.</p>
    </div>
</template>

<style scoped>
</style>