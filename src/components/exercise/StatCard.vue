<script setup>
// 라벨이 질문, value가 답이다. 답을 가장 크게 둔다.
// 부가 수치(unit)는 답을 보조할 뿐이므로 작게 붙인다.
defineProps({
    label: { type: String, required: true },
    value: { type: [String, Number], required: true },
    unit: { type: String, default: '' },
})
</script>

<template>
    <div class="rounded-lg bg-muted/50 px-4 py-3">
        <p class="flex items-center gap-1.5 text-xs text-muted-foreground">
            <slot name="icon" />
            {{ label }}
        </p>
        <p class="mt-1 flex items-baseline gap-1.5">
            <span class="text-xl font-bold">{{ value }}</span>
            <span v-if="unit" class="text-sm font-medium text-muted-foreground tabular-nums">{{ unit }}</span>
        </p>
    </div>
</template>
