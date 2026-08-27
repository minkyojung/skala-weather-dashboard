<script setup>
import { ref } from 'vue';
const count = ref(0);

const showAlert = () => {
    alert('함수가 성공적으로 호출되었습니다')
}
</script>

<template>
  <div class="practice-section">
    <h2>v-on event handling example</h2>
    <h3>1) Inline Event Handling</h3>
    <p> Current Count : {{ count }}</p>
    <button @click="count++">Increment (+1)</button>
    <br />
    <h3>2) Script Event Handling</h3>
    <button @click="showAlert">Show Alert</button>
  </div>
</template>