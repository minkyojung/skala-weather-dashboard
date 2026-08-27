// 세계 주요 도시 목록. 좌표와 이름을 한 곳에서 함께 관리해
// 순서가 어긋나는 실수를 원천 차단한다.
// 대륙별로 고르게 뽑았지만 '지구 전체'가 아니라 '고른 40개'라는 점을 화면에도 명시한다.
export const WORLD_CITIES = [
    // 아시아
    { name: '서울', country: '대한민국', lat: 37.57, lon: 126.98 },
    { name: '도쿄', country: '일본', lat: 35.68, lon: 139.69 },
    { name: '베이징', country: '중국', lat: 39.90, lon: 116.41 },
    { name: '홍콩', country: '중국', lat: 22.32, lon: 114.17 },
    { name: '방콕', country: '태국', lat: 13.76, lon: 100.50 },
    { name: '싱가포르', country: '싱가포르', lat: 1.35, lon: 103.82 },
    { name: '하노이', country: '베트남', lat: 21.03, lon: 105.85 },
    { name: '마닐라', country: '필리핀', lat: 14.60, lon: 120.98 },
    { name: '자카르타', country: '인도네시아', lat: -6.21, lon: 106.85 },
    { name: '델리', country: '인도', lat: 28.61, lon: 77.21 },
    { name: '울란바토르', country: '몽골', lat: 47.89, lon: 106.91 },
    // 중동
    { name: '두바이', country: 'UAE', lat: 25.20, lon: 55.27 },
    { name: '리야드', country: '사우디', lat: 24.71, lon: 46.68 },
    { name: '테헤란', country: '이란', lat: 35.69, lon: 51.39 },
    { name: '이스탄불', country: '튀르키예', lat: 41.01, lon: 28.98 },
    // 유럽
    { name: '런던', country: '영국', lat: 51.51, lon: -0.13 },
    { name: '파리', country: '프랑스', lat: 48.85, lon: 2.35 },
    { name: '베를린', country: '독일', lat: 52.52, lon: 13.40 },
    { name: '로마', country: '이탈리아', lat: 41.90, lon: 12.50 },
    { name: '마드리드', country: '스페인', lat: 40.42, lon: -3.70 },
    { name: '모스크바', country: '러시아', lat: 55.76, lon: 37.62 },
    { name: '헬싱키', country: '핀란드', lat: 60.17, lon: 24.94 },
    { name: '레이캬비크', country: '아이슬란드', lat: 64.15, lon: -21.94 },
    // 아프리카
    { name: '카이로', country: '이집트', lat: 30.04, lon: 31.24 },
    { name: '나이로비', country: '케냐', lat: -1.29, lon: 36.82 },
    { name: '라고스', country: '나이지리아', lat: 6.52, lon: 3.38 },
    { name: '케이프타운', country: '남아공', lat: -33.92, lon: 18.42 },
    { name: '카사블랑카', country: '모로코', lat: 33.57, lon: -7.59 },
    // 북미
    { name: '뉴욕', country: '미국', lat: 40.71, lon: -74.01 },
    { name: '로스앤젤레스', country: '미국', lat: 34.05, lon: -118.24 },
    { name: '시카고', country: '미국', lat: 41.88, lon: -87.63 },
    { name: '토론토', country: '캐나다', lat: 43.65, lon: -79.38 },
    { name: '멕시코시티', country: '멕시코', lat: 19.43, lon: -99.13 },
    { name: '앵커리지', country: '미국', lat: 61.22, lon: -149.90 },
    { name: '호놀룰루', country: '미국', lat: 21.31, lon: -157.86 },
    // 남미
    { name: '상파울루', country: '브라질', lat: -23.55, lon: -46.63 },
    { name: '부에노스아이레스', country: '아르헨티나', lat: -34.60, lon: -58.38 },
    { name: '리마', country: '페루', lat: -12.05, lon: -77.04 },
    // 오세아니아
    { name: '시드니', country: '호주', lat: -33.87, lon: 151.21 },
    { name: '오클랜드', country: '뉴질랜드', lat: -36.85, lon: 174.76 },
]
