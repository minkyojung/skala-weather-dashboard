<script setup>
import { computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useTemperature } from '@/composables/useTemperature.js'

const props = defineProps({
    title: { type: String, required: true },
    cities: { type: Array, required: true },
    // 온도 대신 다른 값을 강조해야 할 때 쓴다. (예: 오늘 최고기온)
    tempKey: { type: String, default: 'temp' },
    // 현지 시각과 현재 날씨는 '지금 기온'을 보여줄 때만 의미가 있다.
    // 오늘 최고기온 옆에 붙이면 다른 시각의 정보라 오해를 부른다.
    showNow: { type: Boolean, default: true },
})

const { unitSymbol, toDisplay } = useTemperature()

const rows = computed(() =>
    props.cities.map(city => ({
        ...city,
        shownTemp: toDisplay(city[props.tempKey]),
    })),
)
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle class="text-base">{{ title }}</CardTitle>
        </CardHeader>
        <CardContent class="space-y-1">
            <div
                v-for="(city, index) in rows"
                :key="city.name"
                class="flex items-center gap-3 border-b py-2 last:border-0"
            >
                <span class="w-5 text-sm text-muted-foreground tabular-nums">{{ index + 1 }}</span>
                <span class="font-medium">{{ city.name }}</span>

                <Badge v-if="showNow" variant="secondary" class="font-normal">
                    {{ city.status }} · {{ city.localTime }} {{ city.isDay ? '☀️' : '🌙' }}
                </Badge>
                <Badge v-else variant="outline" class="font-normal">{{ city.country }}</Badge>

                <span class="ml-auto tabular-nums font-semibold">
                    {{ city.shownTemp }}{{ unitSymbol }}
                </span>
            </div>
        </CardContent>
    </Card>
</template>
