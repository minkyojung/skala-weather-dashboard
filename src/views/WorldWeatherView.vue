<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchWorldWeather } from '@/api/worldWeatherApi.js'
import RankingList from '@/components/exercise/RankingList.vue'
import { Skeleton } from '@/components/ui/skeleton'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const cities = ref([])
const isLoading = ref(false)
const errorMessage = ref('')
const baseCityName = ref('서울')

onMounted(async () => {
    isLoading.value = true
    errorMessage.value = ''
    try {
        cities.value = await fetchWorldWeather()
    } catch (error) {
        errorMessage.value = '세계 날씨를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'
        console.error('[세계 날씨 조회 실패]', error)
    } finally {
        isLoading.value = false
    }
})

// 아래 목록은 모두 이미 받아둔 배열을 정렬만 바꾼 것이라 추가 호출이 없다.
const hottest = computed(() => [...cities.value].sort((a, b) => b.temp - a.temp).slice(0, 5))
const coldest = computed(() => [...cities.value].sort((a, b) => a.temp - b.temp).slice(0, 5))
const hottestToday = computed(() => [...cities.value].sort((a, b) => b.maxTemp - a.maxTemp).slice(0, 5))

const baseCity = computed(() => cities.value.find(city => city.name === baseCityName.value))

// 기온만 같으면 체감이 전혀 다를 수 있어 습도까지 함께 본다.
// 습도 10%를 기온 1도와 비슷한 무게로 취급한다.
const twins = computed(() => {
    if (!baseCity.value) return []
    const base = baseCity.value
    return cities.value
        .filter(city => city.name !== base.name)
        .map(city => ({
            ...city,
            distance: Math.abs(city.temp - base.temp) + Math.abs(city.humidity - base.humidity) / 10,
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 5)
})

const dayNightSummary = computed(() => {
    const day = cities.value.filter(city => city.isDay)
    const night = cities.value.filter(city => !city.isDay)
    if (cities.value.length === 0) return null
    const average = list => (list.reduce((sum, city) => sum + city.temp, 0) / list.length).toFixed(1)
    return {
        dayCount: day.length,
        nightCount: night.length,
        dayAverage: day.length ? average(day) : '-',
        nightAverage: night.length ? average(night) : '-',
    }
})
</script>

<template>
    <div class="max-w-2xl space-y-4">
        <header>
            <h1 class="text-2xl font-bold tracking-tight">지금 지구는</h1>
            <p class="mt-1 text-sm text-muted-foreground">
                전 세계가 아니라 <strong class="font-medium">주요 {{ cities.length || 40 }}개 도시</strong> 안에서의 순위입니다.
            </p>
        </header>

        <div v-if="isLoading" class="space-y-3">
            <Skeleton v-for="n in 3" :key="n" class="h-32 w-full" />
        </div>

        <p v-else-if="errorMessage" class="text-sm text-destructive">{{ errorMessage }}</p>

        <template v-else-if="cities.length">
            <p v-if="dayNightSummary" class="rounded-md bg-muted px-3 py-2 text-sm">
                지금 낮인 도시 {{ dayNightSummary.dayCount }}곳(평균 {{ dayNightSummary.dayAverage }}도) ·
                밤인 도시 {{ dayNightSummary.nightCount }}곳(평균 {{ dayNightSummary.nightAverage }}도)
            </p>

            <RankingList title="🔥 지금 가장 더운 곳" :cities="hottest" />
            <RankingList title="🥶 지금 가장 추운 곳" :cities="coldest" />

            <p class="text-sm text-muted-foreground">
                위 순위는 조회한 순간의 기온이라 <strong class="font-medium">지금 밤인 도시가 유리</strong>합니다.
                시각과 무관하게 비교하려면 아래 '오늘 최고기온'을 보세요.
            </p>
            <RankingList title="☀️ 오늘 최고기온" :cities="hottestToday" temp-key="maxTemp" :show-now="false" />

            <div class="flex items-center gap-2 pt-2">
                <span class="text-sm text-muted-foreground">기준 도시</span>
                <Select v-model="baseCityName">
                    <SelectTrigger class="w-40">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="city in cities" :key="city.name" :value="city.name">
                            {{ city.name }}
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <RankingList :title="`👯 ${baseCityName}와 날씨가 비슷한 곳`" :cities="twins" />
        </template>

        <RouterLink to="/" class="inline-block text-sm underline underline-offset-4">
            ← 메인 대시보드로 돌아가기
        </RouterLink>
    </div>
</template>
