<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { Star, ChevronRight } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import AdviceBadge from './AdviceBadge.vue'
import { useTemperature } from '@/composables/useTemperature.js'
import { useFavoriteStore } from '@/stores/favoriteStore.js'

const props = defineProps({
    city: { type: Object, required: true },
    selected: { type: Boolean, default: false },
    // 다수와 다른 추천일 때만 뱃지를 보여준다.
    // 모든 행이 같은 뱃지를 달면 정보가 아니라 잡음이 된다.
    showAdvice: { type: Boolean, default: false },
})

const emit = defineEmits(['select-card', 'click-detail'])

const { unitSymbol, toDisplay } = useTemperature()

const favoriteStore = useFavoriteStore()
const { isFavorite } = storeToRefs(favoriteStore)
const { toggleFavorite } = favoriteStore

const starred = computed(() => isFavorite.value(props.city.id))
</script>

<template>
    <div
        class="group flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors hover:bg-accent"
        :class="selected && 'bg-accent'"
        @click="emit('select-card', city)"
    >
        <Button
            variant="ghost"
            size="icon"
            class="size-7 shrink-0 transition-opacity"
            :class="!starred && 'opacity-0 group-hover:opacity-100 focus-visible:opacity-100'"
            :aria-label="starred ? '즐겨찾기 해제' : '즐겨찾기 추가'"
            @click.stop="toggleFavorite(city.id)"
        >
            <Star class="size-4" :class="starred ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'" />
        </Button>

        <span class="w-14 shrink-0 font-medium">{{ city.name }}</span>
        <span class="truncate text-muted-foreground">{{ city.description ?? city.status }}</span>

        <AdviceBadge v-if="showAdvice" :city="city" class="ml-2 hidden shrink-0 sm:inline-flex" />

        <span class="ml-auto w-14 shrink-0 text-right font-semibold tabular-nums">
            {{ toDisplay(city.temp) }}{{ unitSymbol }}
        </span>
        <ChevronRight
            class="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
            @click.stop="emit('click-detail', city)"
        />
    </div>
</template>
