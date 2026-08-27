<script setup>
import { ref } from 'vue';
const count = ref(0);

const position = ref('')
const tagName = ref('')
const getOnlyEvent = (e) => {
    position.value = `좌표: X=${e.clientX}, Y=${e.clientY}`
}

const getWithParam = (name, e) => {
tagName.value =
`대상: ${name} / 클릭된 태그: ${e.target.tagName}`
}
</script>

<template>
  <div class="practice-section">
    <h2>v-on 이벤트 객체($event) 활용</h2>
    <p>좌표: {{ position }}</p>
    <p>태그: {{ tagName }}</p>
    <button @click="getOnlyEvent">getOnlyEvent</button>
    <button @click="getWithParam('button', $event)">getWithParam</button>
  </div>
</template>