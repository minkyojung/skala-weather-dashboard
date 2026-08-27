<script setup>
import { weatherData } from '../mock/weatherData.js'
import AdviceBadge from '../components/exercise/AdviceBadge.vue'
</script>

<template>
    <div class="weather-advice">
        <h1>오늘 뭐 입지?</h1>
        <p>도시별 날씨를 바로 해석해서 알려드려요.</p>
        <ul>
            <li v-for="city in weatherData" :key="city.id">
                {{ city.name }} ({{ city.temp }}°C, {{ city.status }})
                <AdviceBadge :city="city" />
            </li>
        </ul>
        <RouterLink to="/">← 메인 대시보드로 돌아가기</RouterLink>
    </div>
</template>

<style scoped>
.weather-advice {
    max-width: 500px;
}
.weather-advice li {
    margin-bottom: 10px;
}
</style>
