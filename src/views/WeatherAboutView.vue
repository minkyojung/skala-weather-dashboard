<template>
    <div class="weather-about">
        <h1>서비스 소개</h1>
        <p>
            이 앱은 Vue 3 기반 학습 목적으로 만들어졌습니다.
        </p>
        <ul>
            <li>Composition API(ref, computed, watch)로 상태를 관리합니다.</li>
            <li>컴포넌트를 검색창/카드/공통 카드 틀로 분리했습니다.</li>
            <li>Vue Router로 메인, 상세, 소개 페이지를 이동합니다.</li>
        </ul>
        <RouterLink to="/">메인 대시보드로 이동</RouterLink>
    </div>
</template>

<style scoped>
.weather-about {
    max-width: 500px;
}
</style>
