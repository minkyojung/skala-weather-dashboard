<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import AdviceBadge from './AdviceBadge.vue'
import { useTemperature } from '@/composables/useTemperature.js'
import { useFavoriteStore } from '@/stores/favoriteStore.js'

const props = defineProps({
    city: {
        type: Object,
        required: true,
    },
})

const emit = defineEmits(['select-card', 'click-detail'])

const { unitSymbol, toDisplay } = useTemperature()

const favoriteStore = useFavoriteStore()
const { isFavorite } = storeToRefs(favoriteStore)
const { toggleFavorite } = favoriteStore

// 더움/선선함 판단은 템플릿에서 원본 city.temp를 그대로 쓴다.
const displayTemp = computed(() => toDisplay(props.city.temp))
</script>

<template>
    <Card class="cursor-pointer transition-colors hover:bg-accent/50" @click="emit('select-card', city)">
        <CardContent class="space-y-2">
            <div class="flex items-center gap-2">
                <span class="font-semibold">{{ city.name }}</span>
                <span class="text-sm text-muted-foreground">{{ city.status }}</span>

                <span class="ml-auto text-lg font-semibold tabular-nums">
                    {{ displayTemp }}{{ unitSymbol }}
                </span>
            </div>

            <div class="flex flex-wrap items-center gap-2">
                <Badge :variant="city.temp >= 25 ? 'destructive' : 'secondary'" class="font-normal">
                    {{ city.temp >= 25 ? '🔥 더움' : '❄️ 선선함' }}
                </Badge>
                <AdviceBadge :city="city" />

                <div class="ml-auto flex gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        :aria-label="isFavorite(city.id) ? '즐겨찾기 해제' : '즐겨찾기 추가'"
                        @click.stop="toggleFavorite(city.id)"
                    >
                        {{ isFavorite(city.id) ? '⭐' : '☆' }}
                    </Button>
                    <Button variant="outline" size="sm" @click.stop="emit('click-detail', city)">
                        상세보기
                    </Button>
                </div>
            </div>
        </CardContent>
    </Card>
</template>
