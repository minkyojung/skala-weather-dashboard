<script setup>
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

defineProps({
    title: {
        type: String,
        required: true,
    },
})
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle class="text-base">{{ title }}</CardTitle>
        </CardHeader>
        <CardContent>
            <slot></slot>
        </CardContent>
    </Card>
</template>
