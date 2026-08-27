<script setup>
const content = '안녕하세요 <strong>Skala-vue</strong> 강의입니다'
</script>

<template>
  <div class="practive-section">
    <h2>v-text 디렉티브 학습</h2>
    <h3>1) 이란 보간법 {{  }} rufrhk:</h3>
    <p>출력: {{ content }}</p>
    <br />
    <h3>2) v-text 디렉티브 결과</h3>
    <p v-text="'출력 : ' + content"></p>
    <br />
    <h3>3) v-text 디렉티브 결과</h3>
    <p v-text="content"></p>
  </div>
</template> 