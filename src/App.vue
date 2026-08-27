<script setup>
import { RouterLink, RouterView } from 'vue-router'
import UnitToggler from './components/exercise/UnitToggler.vue'

const links = [
    { to: '/', label: '날씨 대시보드' },
    { to: '/advice', label: '오늘 뭐 입지?' },
    { to: '/world', label: '지금 지구는' },
    { to: '/about', label: '서비스 소개' },
    { to: '/stack', label: 'Hands On' },
]
</script>

<template>
    <div class="p-5">
        <div class="mb-6 flex flex-wrap items-center justify-between gap-4 border-b pb-3">
            <nav class="flex flex-wrap gap-x-5 gap-y-1 text-sm">
                <RouterLink
                    v-for="link in links"
                    :key="link.to"
                    :to="link.to"
                    exact-active-class="font-semibold underline underline-offset-4"
                >
                    {{ link.label }}
                </RouterLink>
            </nav>
            <UnitToggler />
        </div>
        <RouterView />
    </div>
</template>
