import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useFavoriteStore = defineStore('favorite', () => {
  // state: 즐겨찾기한 도시 id 목록
  const favoriteIds = ref([])

  // getters: 즐겨찾기 개수
  const favoriteCount = computed(() => favoriteIds.value.length)

  // getters: 인자를 받는 getter는 '함수를 반환'하는 computed로 만든다
  const isFavorite = computed(() => (cityId) => favoriteIds.value.includes(cityId))

  // actions: 있으면 빼고, 없으면 넣는다
  function toggleFavorite(cityId) {
    const index = favoriteIds.value.indexOf(cityId)
    if (index === -1) {
      favoriteIds.value.push(cityId)
    } else {
      favoriteIds.value.splice(index, 1)
    }
  }

  return { favoriteIds, favoriteCount, isFavorite, toggleFavorite }
})
