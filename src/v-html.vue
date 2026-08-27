<script setup>
const rawHTMLData = '이 글자는 <span stlyle= "color: red; font-weight: bold;">빨간 글자</span>입니다.'
</script>

<template>
  <div class="practive-section">
    <h2>v-html 디렉티브 학습</h2>
    <h3>1) 일반 보간법 {{  }} 사용 결과</h3>
    <p>{{ rawHTMLData }}</p>
    <br />
    <h3>2) v-html 디렉티브 사용 결과</h3>
    <p v-html="rawHTMLData"></p>
  </div>
</template>