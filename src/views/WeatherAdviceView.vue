<script setup>
import { ref, onMounted } from 'vue'
import { fetchAllWeather } from '@/api/weatherApi.js'
import AdviceBadge from '@/components/exercise/AdviceBadge.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useTemperature } from '@/composables/useTemperature.js'

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
</script>

<template>
    <div class="space-y-6">
        <header>
            <h1 class="text-2xl font-bold tracking-tight">오늘 뭐 입지?</h1>
            <p class="mt-1 text-sm text-muted-foreground">도시별 날씨를 바로 해석해서 알려드려요.</p>
        </header>

        <Card>
            <CardHeader>
                <CardTitle class="text-base">지역별 추천</CardTitle>
            </CardHeader>
            <CardContent>
                <div v-if="isLoading" class="space-y-2">
                    <Skeleton v-for="n in 5" :key="n" class="h-10 w-full" />
                </div>
                <p v-else-if="errorMessage" class="text-sm text-destructive">{{ errorMessage }}</p>

                <div v-else class="space-y-1">
                    <div
                        v-for="city in cities"
                        :key="city.id"
                        class="flex flex-wrap items-center gap-2 border-b py-2 last:border-0"
                    >
                        <span class="font-medium">{{ city.name }}</span>
                        <span class="text-sm text-muted-foreground">
                            {{ toDisplay(city.temp) }}{{ unitSymbol }} · {{ city.status }}
                        </span>
                        <span class="ml-auto">
                            <AdviceBadge :city="city" />
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>

        <RouterLink to="/" class="inline-block text-sm underline underline-offset-4">
            ← 메인 대시보드로 돌아가기
        </RouterLink>
    </div>
</template>
