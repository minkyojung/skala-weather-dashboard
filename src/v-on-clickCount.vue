<script setup>
import { ref, useTemplateRef } from 'vue';

const count = ref(0);
</script>


<template>
  <button @click="count++">Click Count: {{ count }}</button>
</template>
