<script setup>
import { ref, computed, onMounted } from 'vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchAllWeather } from '@/api/weatherApi.js'
import { useTemperature } from '@/composables/useTemperature.js'
import { getWeatherAdvice } from '@/utils/weatherAdvice.js'

const cities = ref([])
const isLoading = ref(false)
const errorMessage = ref('')

const { unitSymbol, toDisplay } = useTemperature()

onMounted(async () => {
    isLoading.value = true
    errorMessage.value = ''
    try {
        cities.value = await fetchAllWeather()
    } catch (error) {
        errorMessage.value = '날씨 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'
        console.error('[옷차림 추천 조회 실패]', error)
    } finally {
        isLoading.value = false
    }
})

// 도시를 나열하는 대신 같은 추천끼리 묶는다.
// '오늘 뭐 입지?'에 대한 답은 도시 목록이 아니라 추천 자체다.
const adviceGroups = computed(() => {
    const groups = new Map()
    for (const city of cities.value) {
        const advice = getWeatherAdvice(city)
        if (!groups.has(advice.message)) {
            groups.set(advice.message, { ...advice, cities: [] })
        }
        groups.get(advice.message).cities.push(city)
    }
    return [...groups.values()].sort((a, b) => b.cities.length - a.cities.length)
})
</script>

<template>
    <div class="space-y-6">
        <header>
            <h1 class="text-2xl font-bold tracking-tight">오늘 뭐 입지?</h1>
            <p class="mt-1 text-sm text-muted-foreground">
                지금 날씨를 해석해 필요한 준비물끼리 묶었습니다.
            </p>
        </header>

        <div v-if="isLoading" class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton v-for="n in 3" :key="n" class="h-44 w-full" />
        </div>
        <p v-else-if="errorMessage" class="text-sm text-destructive">{{ errorMessage }}</p>

        <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card v-for="group in adviceGroups" :key="group.message">
                <CardHeader>
                    <CardTitle class="flex items-center gap-2 text-base">
                        <span class="text-2xl">{{ group.icon }}</span>
                        {{ group.message }}
                    </CardTitle>
                    <CardDescription>{{ group.cities.length }}개 도시</CardDescription>
                </CardHeader>
                <CardContent class="space-y-1">
                    <div
                        v-for="city in group.cities"
                        :key="city.id"
                        class="flex items-center gap-2 border-b py-2 text-sm last:border-0"
                    >
                        <span class="font-medium">{{ city.name }}</span>
                        <Badge variant="outline" class="font-normal">{{ city.status }}</Badge>
                        <span class="ml-auto tabular-nums">
                            {{ toDisplay(city.temp) }}{{ unitSymbol }}
                        </span>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
</template>
