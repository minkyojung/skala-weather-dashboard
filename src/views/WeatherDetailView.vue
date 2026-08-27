<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchWeatherByCityId, fetchForecastByCityId } from '@/api/weatherApi.js'
import { useTemperature } from '@/composables/useTemperature.js'
import ForecastList from '@/components/exercise/ForecastList.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

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
    <div class="max-w-2xl space-y-4">
        <h1 class="text-2xl font-bold tracking-tight">지역 상세 기상 관측 정보</h1>

        <div v-if="isLoading" class="space-y-3">
            <Skeleton class="h-40 w-full" />
            <Skeleton class="h-56 w-full" />
        </div>
        <p v-else-if="errorMessage" class="text-sm text-destructive">{{ errorMessage }}</p>

        <template v-else-if="cityInfo">
            <Card>
                <CardHeader>
                    <CardTitle class="text-base">대한민국 {{ cityInfo.name }}</CardTitle>
                </CardHeader>
                <CardContent class="space-y-3">
                    <div class="flex items-baseline gap-2">
                        <span class="text-4xl font-bold tabular-nums">{{ displayTemp }}{{ unitSymbol }}</span>
                        <span class="text-muted-foreground">{{ cityInfo.description }}</span>
                    </div>
                    <dl class="grid grid-cols-2 gap-2 text-sm">
                        <div class="flex justify-between rounded-md bg-muted px-3 py-2">
                            <dt class="text-muted-foreground">습도</dt>
                            <dd class="tabular-nums">{{ cityInfo.humidity }}%</dd>
                        </div>
                        <div class="flex justify-between rounded-md bg-muted px-3 py-2">
                            <dt class="text-muted-foreground">풍속</dt>
                            <dd class="tabular-nums">{{ cityInfo.windSpeed }}m/s</dd>
                        </div>
                    </dl>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle class="text-base">5일 예보</CardTitle>
                </CardHeader>
                <CardContent>
                    <ForecastList :days="forecast" />
                </CardContent>
            </Card>
        </template>

        <p v-else class="text-sm text-muted-foreground">해당 도시 정보를 찾을 수 없습니다.</p>

        <RouterLink to="/" class="inline-block text-sm underline underline-offset-4">
            ← 메인 대시보드로 돌아가기
        </RouterLink>
    </div>
</template>
