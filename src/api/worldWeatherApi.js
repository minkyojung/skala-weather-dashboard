import axios from 'axios'
import { WORLD_CITIES } from '../constants/worldCities.js'

// Open-Meteo는 키가 필요 없고, 좌표를 콤마로 이어 붙이면
// 도시 여러 곳을 한 번의 요청으로 받을 수 있다.
const openMeteo = axios.create({
    baseURL: 'https://api.open-meteo.com/v1',
    timeout: 10000,
})

// Open-Meteo는 날씨를 WMO 표준 '숫자 코드'로 준다.
// (OpenWeatherMap이 'Rain' 같은 문자열을 주던 것과 다르다.)
const WMO_CODES = {
    0: '맑음',
    1: '대체로 맑음', 2: '구름 조금', 3: '흐림',
    45: '안개', 48: '서리 안개',
    51: '약한 이슬비', 53: '이슬비', 55: '짙은 이슬비',
    61: '약한 비', 63: '비', 65: '강한 비',
    66: '어는 비', 67: '강한 어는 비',
    71: '약한 눈', 73: '눈', 75: '강한 눈', 77: '싸락눈',
    80: '소나기', 81: '강한 소나기', 82: '매우 강한 소나기',
    85: '눈 소나기', 86: '강한 눈 소나기',
    95: '뇌우', 96: '우박 뇌우', 99: '강한 우박 뇌우',
}

// 좌표는 격자에 맞춰 살짝 보정되어 돌아오므로 정확히 같지는 않다.
// 오타로 엉뚱한 지점을 부른 경우만 걸러내면 되므로 넉넉한 허용치를 쓴다.
const COORD_TOLERANCE = 1

// '13:30' 같은 24시간 표기를 '1:30 PM' 형태로 바꾼다.
function toAmPm(hhmm) {
    const [hour, minute] = hhmm.split(':').map(Number)
    const suffix = hour < 12 ? 'AM' : 'PM'
    const hour12 = hour % 12 === 0 ? 12 : hour % 12
    return `${hour12}:${String(minute).padStart(2, '0')} ${suffix}`
}

export async function fetchWorldWeather() {
    const { data } = await openMeteo.get('/forecast', {
        params: {
            latitude: WORLD_CITIES.map(city => city.lat).join(','),
            longitude: WORLD_CITIES.map(city => city.lon).join(','),
            current: 'temperature_2m,relative_humidity_2m,weather_code,is_day',
            daily: 'temperature_2m_max',
            timezone: 'auto',
            forecast_days: 1,
        },
    })

    // 응답은 이름 없이 '보낸 순서대로' 배열로 온다.
    return WORLD_CITIES.map((city, index) => {
        const point = data[index]
        if (!point?.current) return null

        // 좌표가 크게 어긋났다면 목록에 오타가 있다는 뜻이다.
        const drifted =
            Math.abs(point.latitude - city.lat) > COORD_TOLERANCE ||
            Math.abs(point.longitude - city.lon) > COORD_TOLERANCE
        if (drifted) {
            console.warn(`[좌표 확인 필요] ${city.name}: 보낸 값과 응답 좌표가 다릅니다.`)
            return null
        }

        const current = point.current
        return {
            name: city.name,
            country: city.country,
            temp: Math.round(current.temperature_2m),
            maxTemp: Math.round(point.daily.temperature_2m_max[0]),
            humidity: current.relative_humidity_2m,
            status: WMO_CODES[current.weather_code] ?? '알 수 없음',
            isDay: current.is_day === 1,
            localTime: toAmPm(current.time.slice(11)),
        }
    }).filter(Boolean)
}
