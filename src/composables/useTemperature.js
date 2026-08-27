import { storeToRefs } from 'pinia'
import { useConfigStore } from '../stores/configStore.js'

// 원본 데이터는 항상 섭씨다. 화면에 보여줄 때만 현재 단위로 바꾼다.
//
// 주의: toDisplay()는 configStore.unit을 읽으므로 computed나 템플릿 안에서
// 호출해야 단위를 바꿨을 때 다시 계산된다.
export function useTemperature() {
    const configStore = useConfigStore()
    const { unitSymbol } = storeToRefs(configStore)

    // 표시 전용이다. 더움/선선함 같은 판단에는 섭씨 원본을 그대로 써야 한다.
    // 변환값(82℉)으로 25도 기준을 비교하면 모든 도시가 '더움'이 된다.
    function toDisplay(celsius, decimals = 0) {
        if (celsius === null || celsius === undefined) return null

        const value =
            configStore.unit === 'fahrenheit' ? (celsius * 9) / 5 + 32 : celsius

        return decimals > 0 ? Number(value.toFixed(decimals)) : Math.round(value)
    }

    return { unitSymbol, toDisplay }
}
