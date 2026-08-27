<template>
    <div class="base-card">
    <slot>
    <p>기본 콘텐츠 영역입니다.</p>
    </slot>
    </div>
    </template>

<style scoped>
.base-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 12px;
}
</style>