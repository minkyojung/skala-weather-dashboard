// type은 아이콘 매핑용 안정 키다. icon(이모지)은 3일차 실습에서 쓰므로 그대로 둔다.
export function getWeatherAdvice(city) {
    if (city.status === '비') {
        return { type: 'umbrella', icon: '☔', message: '우산 챙기세요' }
    }
    if (city.temp < 20) {
        return { type: 'jacket', icon: '🧥', message: '겉옷 필요해요' }
    }
    return { type: 'good', icon: '😊', message: '외출하기 좋은 날씨예요' }
}
