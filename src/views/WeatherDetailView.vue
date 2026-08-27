<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchWeatherByCityId, fetchForecastByCityId } from '@/api/weatherApi.js'
import { useTemperature } from '@/composables/useTemperature.js'
import ForecastList from '@/components/exercise/ForecastList.vue'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Droplets, Wind, Star } from '@lucide/vue'
import { storeToRefs } from 'pinia'
import { useFavoriteStore } from '@/stores/favoriteStore.js'

const route = useRoute()
const cityInfo = ref(null)
const forecast = ref([])
const isLoading = ref(false)
const errorMessage = ref('')

const { unitSymbol, toDisplay } = useTemperature()

const favoriteStore = useFavoriteStore()
const { isFavorite } = storeToRefs(favoriteStore)
const { toggleFavorite } = favoriteStore

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
    <div class="space-y-6">
        <Button as-child variant="ghost" size="sm" class="-ml-2">
            <RouterLink to="/">
                <ArrowLeft class="size-4" />
                대시보드
            </RouterLink>
        </Button>

        <div v-if="isLoading" class="grid gap-4 lg:grid-cols-3">
            <Skeleton class="h-56 w-full" />
            <Skeleton class="h-56 w-full lg:col-span-2" />
        </div>
        <p v-else-if="errorMessage" class="text-sm text-destructive">{{ errorMessage }}</p>

        <div v-else-if="cityInfo" class="grid gap-4 lg:grid-cols-3">
            <Card class="lg:sticky lg:top-20 lg:self-start">
                <CardHeader>
                    <CardDescription>대한민국</CardDescription>
                    <CardTitle class="text-xl">{{ cityInfo.name }}</CardTitle>
                    <CardAction>
                        <Button
                            variant="ghost"
                            size="icon"
                            :aria-label="isFavorite(cityInfo.id) ? '즐겨찾기 해제' : '즐겨찾기 추가'"
                            @click="toggleFavorite(cityInfo.id)"
                        >
                            <Star
                                class="size-4"
                                :class="isFavorite(cityInfo.id) ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'"
                            />
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent class="space-y-4">
                    <div>
                        <p class="text-5xl font-bold tabular-nums">{{ displayTemp }}{{ unitSymbol }}</p>
                        <p class="mt-1 text-muted-foreground">{{ cityInfo.description }}</p>
                    </div>

                    <dl class="space-y-2 text-sm">
                        <div class="flex items-center gap-2 rounded-md bg-muted px-3 py-2">
                            <Droplets class="size-4 shrink-0 text-muted-foreground" />
                            <dt class="text-muted-foreground">습도</dt>
                            <dd class="ml-auto tabular-nums">{{ cityInfo.humidity }}%</dd>
                        </div>
                        <div class="flex items-center gap-2 rounded-md bg-muted px-3 py-2">
                            <Wind class="size-4 shrink-0 text-muted-foreground" />
                            <dt class="text-muted-foreground">풍속</dt>
                            <dd class="ml-auto tabular-nums">{{ cityInfo.windSpeed }}m/s</dd>
                        </div>
                    </dl>
                </CardContent>
            </Card>

            <Card class="lg:col-span-2">
                <CardHeader>
                    <CardTitle class="text-base">5일 예보</CardTitle>
                    <CardDescription>3시간 간격 예보를 날짜별로 묶어 최저·최고를 표시합니다.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ForecastList :days="forecast" />
                </CardContent>
            </Card>
        </div>

        <p v-else class="text-sm text-muted-foreground">해당 도시 정보를 찾을 수 없습니다.</p>
    </div>
</template>
