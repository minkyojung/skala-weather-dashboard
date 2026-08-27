<script setup>
import { storeToRefs } from 'pinia'
import { useCounterStore } from '../../../stores/counter'

const counterStore = useCounterStore()

// storeToRefs: state/getter를 반응성 유지한 채 구조 분해
const { count, doubleCount } = storeToRefs(counterStore)
// action은 그대로 구조 분해 가능
const { increment, decrement, reset } = counterStore
</script>

<template>
  <div>
    <p>count: {{ count }}</p>
    <p>doubleCount: {{ doubleCount }}</p>
    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>
    <button @click="reset">reset</button>
  </div>
</template>
