import axios from 'axios'
import { CITIES, findCityById } from '../constants/cities.js'

const apiKey = import.meta.env.VITE_OWM_API_KEY

const owm = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    timeout: 5000,
    params: {
        appid: apiKey,
        units: 'metric', // 항상 섭씨로 받고, 화씨 변환은 화면에서 처리한다
        lang: 'kr',
    },
})

// OpenWeatherMap의 영문 날씨 분류를 기존 화면이 쓰던 한글 status로 맞춘다.
const STATUS_MAP = {
    Clear: '맑음',
    Clouds: '구름',
    Rain: '비',
    Drizzle: '비',
    Snow: '눈',
    Thunderstorm: '천둥번개',
}

function toStatus(weather) {
    return STATUS_MAP[weather.main] ?? weather.description
}

// API 응답을 화면이 쓰던 형태({ id, name, temp, status ... })로 변환한다.
function normalize(city, data) {
    const weather = data.weather[0]
    return {
        id: city.id,
        name: city.name,
        temp: Math.round(data.main.temp),
        status: toStatus(weather),
        description: weather.description,
        icon: weather.icon,
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
    }
}

export async function fetchWeatherByCityId(cityId) {
    const city = findCityById(cityId)
    if (!city) return null

    const { data } = await owm.get('/weather', { params: { q: city.query } })
    return normalize(city, data)
}

// 도시 7개를 순서대로 기다리면 7배 느리므로 한 번에 병렬로 보낸다.
export async function fetchAllWeather() {
    const requests = CITIES.map(async (city) => {
        const { data } = await owm.get('/weather', { params: { q: city.query } })
        return normalize(city, data)
    })
    return Promise.all(requests)
}

// 5일 예보는 3시간 간격 40개로 오므로, 날짜별로 묶어 하루 요약으로 만든다.
export async function fetchForecastByCityId(cityId) {
    const city = findCityById(cityId)
    if (!city) return []

    const { data } = await owm.get('/forecast', { params: { q: city.query } })

    const byDate = new Map()
    for (const item of data.list) {
        const date = item.dt_txt.slice(0, 10)
        if (!byDate.has(date)) {
            byDate.set(date, [])
        }
        byDate.get(date).push(item)
    }

    return [...byDate].map(([date, items]) => {
        const temps = items.map(item => item.main.temp)
        // 정오에 가까운 데이터를 그 날의 대표 날씨로 삼는다.
        const noon = items.find(item => item.dt_txt.endsWith('12:00:00')) ?? items[0]
        return {
            date,
            minTemp: Math.round(Math.min(...temps)),
            maxTemp: Math.round(Math.max(...temps)),
            status: toStatus(noon.weather[0]),
            icon: noon.weather[0].icon,
        }
    })
}
