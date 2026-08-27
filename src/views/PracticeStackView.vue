<script setup>
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Weather from '@/weather.vue'
import Weather2 from '@/weather-2.vue'
import WeatherParent from '@/WeatherParent.vue'
import StoreCounter from '@/components/practices/library/StoreCounter.vue'

const practices = [
    { title: '날씨 Mockup (1일차)', component: Weather },
    { title: '날씨 Mockup (2일차)', component: Weather2 },
    { title: '날씨 컴포넌트 분리 (3일차)', component: WeatherParent },
    { title: 'Pinia Store 카운터', component: StoreCounter },
]
</script>

<template>
    <div class="max-w-3xl space-y-4">
        <header>
            <h1 class="text-2xl font-bold tracking-tight">Hands On</h1>
            <p class="mt-1 text-sm text-muted-foreground">
                수업 중 수행한 실습을 순서대로 보여줍니다. (총 {{ practices.length }}개)
            </p>
        </header>

        <Card v-for="(practice, index) in practices" :key="practice.title">
            <CardHeader>
                <CardTitle class="text-base text-muted-foreground">
                    {{ index + 1 }}. {{ practice.title }}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <component :is="practice.component" />
            </CardContent>
        </Card>
    </div>
</template>
