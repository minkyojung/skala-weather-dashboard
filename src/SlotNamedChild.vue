<template>
    <div class="base-card">
        <header>
            <slot name="header"></slot>
        </header>
        <main>
        <slot></slot>
        </main>
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