<script setup>
defineProps({
    searchQuery: {
        type: String,
        required: true,
    },
})

const emit = defineEmits(['update-query'])
</script>

<template>
    <div class="search-bar">
        <input
            type="text"
            :value="searchQuery"
            @input="emit('update-query', $event.target.value)"
            placeholder="검색할 도시 이름 입력"
        />
        <p>검색 중인 도시 : {{ searchQuery }}</p>
    </div>
</template>

<style scoped>
.search-bar input {
    width: 100%;
    box-sizing: border-box;
    padding: 6px;
}
</style>
