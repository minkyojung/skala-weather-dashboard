<script setup>
import { Input } from '@/components/ui/input'

defineProps({
    searchQuery: {
        type: String,
        required: true,
    },
})

const emit = defineEmits(['update-query'])
</script>

<template>
    <div class="space-y-2">
        <Input
            type="text"
            :model-value="searchQuery"
            placeholder="검색할 도시 이름 입력"
            @update:model-value="emit('update-query', String($event))"
        />
        <p class="text-sm text-muted-foreground">검색 중인 도시 : {{ searchQuery }}</p>
    </div>
</template>
