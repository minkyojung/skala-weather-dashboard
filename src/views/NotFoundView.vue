<template>
    <div class="not-found">
        <h1>404</h1>
        <p>요청하신 주소가 존재하지 않거나, 아직 개발되지 않았습니다.</p>
        <RouterLink to="/">날씨 메인으로 이동</RouterLink>
    </div>
</template>

<style scoped>
.not-found {
    max-width: 500px;
    text-align: center;
}
</style>
