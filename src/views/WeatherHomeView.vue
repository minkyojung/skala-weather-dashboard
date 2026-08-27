<script setup>
import { ref, computed, watch, watchEffect, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { Search, Thermometer, Flame, Snowflake, Star, Droplets, Wind, ArrowRight } from '@lucide/vue'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import StatCard from '@/components/exercise/StatCard.vue'
import WeatherRow from '@/components/exercise/WeatherRow.vue'
import AdviceBadge from '@/components/exercise/AdviceBadge.vue'
import { fetchAllWeather } from '@/api/weatherApi.js'
import { useTemperature } from '@/composables/useTemperature.js'
import { useFavoriteStore } from '@/stores/favoriteStore.js'
import { getWeatherAdvice } from '@/utils/weatherAdvice.js'

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

// 다수와 다른 추천을 가진 도시만 목록에서 뱃지를 단다.
const majorityAdvice = computed(() => adviceGroups.value[0]?.message ?? '')

const previewCity = computed(() => selectedCityInfo.value ?? weatherList.value[0] ?? null)

const filteredWeatherList = computed(() =>
    weatherList.value.filter(city => city.name.includes(searchQuery.value)),
)

const averageTemp = computed(() => {
    if (weatherList.value.length === 0) return 0
    const total = weatherList.value.reduce((sum, city) => sum + city.temp, 0)
    return total / weatherList.value.length
})

// 최고/최저는 섭씨 원본으로 뽑고, 표시할 때만 단위를 적용한다.
const hottestCity = computed(() =>
    weatherList.value.reduce((max, city) => (city.temp > max.temp ? city : max), weatherList.value[0]),
)
const coldestCity = computed(() =>
    weatherList.value.reduce((min, city) => (city.temp < min.temp ? city : min), weatherList.value[0]),
)

// 옷차림 추천을 종류별로 묶는다.
const adviceGroups = computed(() => {
    const groups = new Map()
    for (const city of weatherList.value) {
        const advice = getWeatherAdvice(city)
        if (!groups.has(advice.message)) {
            groups.set(advice.message, { ...advice, cities: [] })
        }
        groups.get(advice.message).cities.push(city)
    }
    return [...groups.values()].sort((a, b) => b.cities.length - a.cities.length)
})

watch(selectedCityInfo, (newCity) => {
    if (newCity) {
        console.log(`[상태 변경] 선택된 도시: ${newCity.name}`)
    }
})

watchEffect(() => {
    console.log(`[검색어 변경] searchQuery: "${searchQuery.value}"`)
})

const handleClickDetail = (city) => {
    router.push('/weather/' + city.id)
}
</script>

<template>
    <div class="space-y-6">
        <header>
            <h1 class="text-2xl font-bold tracking-tight">날씨 대시보드</h1>
            <p class="mt-1 text-sm text-muted-foreground">
                전국 {{ weatherList.length || 7 }}개 도시의 실시간 기상 정보
            </p>
        </header>

        <div v-if="isLoading" class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Skeleton v-for="n in 4" :key="n" class="h-16 w-full" />
        </div>
        <div v-else-if="weatherList.length" class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="가장 더운 곳" :value="hottestCity.name" :unit="`${toDisplay(hottestCity.temp)}${unitSymbol}`">
                <template #icon><Flame class="size-3.5" /></template>
            </StatCard>
            <StatCard label="가장 추운 곳" :value="coldestCity.name" :unit="`${toDisplay(coldestCity.temp)}${unitSymbol}`">
                <template #icon><Snowflake class="size-3.5" /></template>
            </StatCard>
            <StatCard label="즐겨찾기" :value="favoriteCount" unit="개">
                <template #icon><Star class="size-3.5" /></template>
            </StatCard>
            <StatCard label="평균 기온" :value="`${toDisplay(averageTemp, 1)}${unitSymbol}`">
                <template #icon><Thermometer class="size-3.5" /></template>
            </StatCard>
        </div>

        <div class="grid gap-4 lg:grid-cols-3">
            <Card class="lg:col-span-2">
                <CardHeader>
                    <CardTitle class="text-base">지역별 날씨 현황</CardTitle>
                    <CardDescription v-if="adviceGroups.length === 1">
                        오늘은 {{ weatherList.length }}곳 모두 {{ majorityAdvice }}
                    </CardDescription>
                    <CardDescription v-else-if="adviceGroups.length">
                        {{ adviceGroups.map(g => `${g.message.replace(/하세요|해요|예요/, '')} ${g.cities.length}곳`).join(' · ') }}
                    </CardDescription>
                    <CardAction>
                        <div class="relative w-44">
                            <Search class="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                            <Input v-model="searchQuery" class="h-8 pl-8 text-sm" placeholder="도시 검색" />
                        </div>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <div v-if="isLoading" class="space-y-1">
                        <Skeleton v-for="n in 7" :key="n" class="h-10 w-full" />
                    </div>
                    <p v-else-if="errorMessage" class="text-sm text-destructive">{{ errorMessage }}</p>

                    <div v-else-if="filteredWeatherList.length" class="-mx-2">
                        <WeatherRow
                            v-for="city in filteredWeatherList"
                            :key="city.id"
                            :city="city"
                            :selected="previewCity?.id === city.id"
                            :show-advice="adviceGroups.length > 1 && getWeatherAdvice(city).message !== majorityAdvice"
                            @select-card="selectedCityInfo = city"
                            @click-detail="handleClickDetail"
                        />
                    </div>
                    <p v-else class="py-8 text-center text-sm text-muted-foreground">
                        '{{ searchQuery }}'와 일치하는 도시가 없습니다.
                    </p>
                </CardContent>
            </Card>

            <Card v-if="previewCity" class="lg:sticky lg:top-20 lg:self-start">
                <CardHeader>
                    <CardDescription>선택한 도시</CardDescription>
                    <CardTitle class="text-xl">{{ previewCity.name }}</CardTitle>
                </CardHeader>
                <CardContent class="space-y-4">
                    <div>
                        <p class="text-4xl font-bold tabular-nums">
                            {{ toDisplay(previewCity.temp) }}{{ unitSymbol }}
                        </p>
                        <p class="mt-1 text-sm text-muted-foreground">{{ previewCity.description }}</p>
                    </div>

                    <AdviceBadge :city="previewCity" />

                    <dl class="space-y-1.5 text-sm">
                        <div class="flex items-center gap-2">
                            <Droplets class="size-4 shrink-0 text-muted-foreground" />
                            <dt class="text-muted-foreground">습도</dt>
                            <dd class="ml-auto tabular-nums">{{ previewCity.humidity }}%</dd>
                        </div>
                        <div class="flex items-center gap-2">
                            <Wind class="size-4 shrink-0 text-muted-foreground" />
                            <dt class="text-muted-foreground">풍속</dt>
                            <dd class="ml-auto tabular-nums">{{ previewCity.windSpeed }}m/s</dd>
                        </div>
                    </dl>

                    <Button variant="outline" size="sm" class="w-full" @click="handleClickDetail(previewCity)">
                        상세보기
                        <ArrowRight class="size-4" />
                    </Button>
                </CardContent>
            </Card>
        </div>
    </div>
</template>
