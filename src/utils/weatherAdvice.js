export function getWeatherAdvice(city) {
    if (city.status === '비') {
        return { icon: '☔', message: '우산 챙기세요' }
    }
    if (city.temp < 20) {
        return { icon: '🧥', message: '겉옷 필요해요' }
    }
    return { icon: '😊', message: '외출하기 좋은 날씨예요' }
}
