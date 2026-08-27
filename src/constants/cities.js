// 대시보드에 표시할 도시 목록.
// query는 OpenWeatherMap 호출용 도시명이고, name은 화면에 보여줄 한글 이름이다.
export const CITIES = [
    { id: 'city_01', name: '서울', query: 'Seoul,KR' },
    { id: 'city_02', name: '수원', query: 'Suwon,KR' },
    { id: 'city_03', name: '부산', query: 'Busan,KR' },
    { id: 'city_04', name: '인천', query: 'Incheon,KR' },
    { id: 'city_05', name: '광주', query: 'Gwangju,KR' },
    { id: 'city_06', name: '대전', query: 'Daejeon,KR' },
    { id: 'city_07', name: '대구', query: 'Daegu,KR' },
]

export function findCityById(cityId) {
    return CITIES.find(city => city.id === cityId)
}
