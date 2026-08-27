<script setup>
defineProps({
    title: {
        type: String,
        required: true,
    },
})
</script>

<template>
    <div class="dashboard-card">
        <h3>{{ title }}</h3>
        <slot></slot>
    </div>
</template>

<style scoped>
.dashboard-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
}
.dashboard-card h3 {
    margin-top: 0;
}
</style>
