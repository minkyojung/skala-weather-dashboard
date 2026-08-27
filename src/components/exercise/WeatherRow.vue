<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { Star, ChevronRight } from '@lucide/vue'
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

// 더움/선선함 판단은 항상 섭씨 원본으로 한다.
const isHot = computed(() => props.city.temp >= 25)
</script>

<template>
    <div
        class="flex cursor-pointer items-center gap-3 px-2 py-3 transition-colors hover:bg-accent/50"
        @click="emit('select-card', city)"
    >
        <Button
            variant="ghost"
            size="icon"
            class="shrink-0"
            :aria-label="isFavorite(city.id) ? '즐겨찾기 해제' : '즐겨찾기 추가'"
            @click.stop="toggleFavorite(city.id)"
        >
            <Star
                class="size-4"
                :class="isFavorite(city.id) ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'"
            />
        </Button>

        <div class="min-w-0">
            <p class="font-medium">{{ city.name }}</p>
            <p class="text-xs text-muted-foreground">{{ city.description ?? city.status }}</p>
        </div>

        <div class="ml-auto flex items-center gap-3">
            <AdviceBadge :city="city" class="hidden sm:inline-flex" />
            <Badge :variant="isHot ? 'destructive' : 'secondary'" class="hidden font-normal md:inline-flex">
                {{ isHot ? '더움' : '선선함' }}
            </Badge>
            <span class="w-16 text-right text-lg font-semibold tabular-nums">
                {{ toDisplay(city.temp) }}{{ unitSymbol }}
            </span>
            <Button
                variant="ghost"
                size="icon"
                aria-label="상세보기"
                @click.stop="emit('click-detail', city)"
            >
                <ChevronRight class="size-4" />
            </Button>
        </div>
    </div>
</template>
