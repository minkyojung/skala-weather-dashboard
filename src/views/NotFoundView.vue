<script setup>
import { Button } from '@/components/ui/button'
</script>

<template>
    <div class="flex flex-col items-center gap-3 py-20 text-center">
        <h1 class="text-5xl font-bold tracking-tight">404</h1>
        <p class="text-sm text-muted-foreground">
            요청하신 주소가 존재하지 않거나, 아직 개발되지 않았습니다.
        </p>
        <Button as-child variant="outline">
            <RouterLink to="/">날씨 메인으로 이동</RouterLink>
        </Button>
    </div>
</template>
