<script setup>
import { Card, CardContent, CardDescription } from '@/components/ui/card'

defineProps({
    label: { type: String, required: true },
    value: { type: [String, Number], required: true },
    hint: { type: String, default: '' },
})
</script>

<template>
    <Card>
        <CardContent class="space-y-1">
            <CardDescription class="flex items-center gap-1.5 text-xs">
                <slot name="icon" />
                {{ label }}
            </CardDescription>
            <p class="text-2xl font-bold tabular-nums">{{ value }}</p>
            <p v-if="hint" class="text-xs text-muted-foreground">{{ hint }}</p>
        </CardContent>
    </Card>
</template>
