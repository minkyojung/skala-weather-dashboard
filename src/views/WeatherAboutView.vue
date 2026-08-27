<script setup>
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const sections = [
    {
        title: '상태 관리',
        items: [
            'Composition API(ref, computed, watch)로 화면 상태를 다룹니다.',
            'Pinia로 온도 단위와 즐겨찾기를 전역에서 공유합니다.',
            '온도 변환은 useTemperature 컴포저블 한 곳에 모았습니다.',
        ],
    },
    {
        title: '데이터',
        items: [
            'OpenWeatherMap에서 현재 날씨와 5일 예보를 가져옵니다.',
            'Open-Meteo로 세계 40개 도시를 요청 한 번에 비교합니다.',
            '원본은 항상 섭씨로 받고, 화씨 변환은 화면에서만 합니다.',
        ],
    },
    {
        title: 'UI',
        items: [
            'Tailwind CSS와 shadcn-vue 컴포넌트로 화면을 구성했습니다.',
            'Vue Router로 대시보드, 상세, 세계 날씨 페이지를 오갑니다.',
        ],
    },
]
</script>

<template>
    <div class="max-w-2xl space-y-4">
        <header>
            <h1 class="text-2xl font-bold tracking-tight">서비스 소개</h1>
            <p class="mt-1 text-sm text-muted-foreground">Vue 3 학습 목적으로 만든 날씨 앱입니다.</p>
        </header>

        <Card v-for="section in sections" :key="section.title">
            <CardHeader>
                <CardTitle class="text-base">{{ section.title }}</CardTitle>
            </CardHeader>
            <CardContent>
                <ul class="list-disc space-y-1 pl-5 text-sm">
                    <li v-for="item in section.items" :key="item">{{ item }}</li>
                </ul>
            </CardContent>
        </Card>

        <RouterLink to="/" class="inline-block text-sm underline underline-offset-4">
            ← 메인 대시보드로 돌아가기
        </RouterLink>
    </div>
</template>
