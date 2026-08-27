<script setup>
import { ref, computed, watch, watchEffect, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
import SearchBar from '@/components/exercise/SearchBar.vue'
import WeatherCard from '@/components/exercise/WeatherCard.vue'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchAllWeather } from '../api/weatherApi.js'
import { useTemperature } from '../composables/useTemperature.js'
import { useFavoriteStore } from '../stores/favoriteStore.js'

const router = useRouter()

const { unitSymbol, toDisplay } = useTemperature()

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

const displayAverageTemp = computed(() => toDisplay(averageTemp.value, 1))

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
    <div class="space-y-6">
        <h1 class="text-2xl font-bold tracking-tight">날씨 대시보드</h1>

        <BaseDashboardCard title="도시 검색">
            <SearchBar :search-query="searchQuery" @update-query="handleUpdateQuery" />
        </BaseDashboardCard>

        <div class="flex flex-wrap gap-x-4 gap-y-1 rounded-md bg-muted px-3 py-2 text-sm">
            <span v-if="selectedCityInfo">{{ selectedCityInfo.name }} 선택됨</span>
            <span>평균 기온 {{ displayAverageTemp }}{{ unitSymbol }}</span>
            <span>⭐ 즐겨찾기 {{ favoriteCount }}개</span>
        </div>

        <BaseDashboardCard title="지역별 날씨 현황">
            <div v-if="isLoading" class="space-y-3">
                <Skeleton v-for="n in 3" :key="n" class="h-24 w-full" />
            </div>
            <p v-else-if="errorMessage" class="text-sm text-destructive">{{ errorMessage }}</p>

            <div v-else class="space-y-3">
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
                <p v-else class="text-sm text-muted-foreground">검색 결과가 일치하는 도시가 없습니다.</p>
            </div>
        </BaseDashboardCard>
    </div>
</template>
