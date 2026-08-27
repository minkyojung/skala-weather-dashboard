<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { CloudSun } from '@lucide/vue'
import UnitToggler from '@/components/exercise/UnitToggler.vue'

const links = [
    { to: '/', label: '대시보드' },
    { to: '/world', label: '지금 지구는' },
    { to: '/advice', label: '오늘 뭐 입지?' },
    { to: '/stack', label: 'Hands On' },
    { to: '/about', label: '소개' },
]
</script>

<template>
    <div class="min-h-screen bg-background">
        <header class="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
            <div class="mx-auto flex h-14 max-w-6xl items-center gap-6 px-4">
                <RouterLink to="/" class="flex shrink-0 items-center gap-2 font-semibold">
                    <CloudSun class="size-5" />
                    날씨 대시보드
                </RouterLink>

                <nav class="flex items-center gap-4 overflow-x-auto text-sm">
                    <RouterLink
                        v-for="link in links.slice(1)"
                        :key="link.to"
                        :to="link.to"
                        class="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
                        exact-active-class="!text-foreground font-medium"
                    >
                        {{ link.label }}
                    </RouterLink>
                </nav>

                <div class="ml-auto shrink-0">
                    <UnitToggler />
                </div>
            </div>
        </header>

        <main class="mx-auto max-w-6xl px-4 py-6">
            <RouterView />
        </main>
    </div>
</template>
