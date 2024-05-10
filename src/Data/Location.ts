import axios from 'axios';

const getMap = async (query: string, coordinate: string) => {
    try {
        const response = await axios.get('https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode', {
            params: {
                query: query,
                coordinate: coordinate
            },
            headers: {
                'X-NCP-APIGW-API-KEY-ID': process.env.CLIENT_ID,
                'X-NCP-APIGW-API-KEY': process.env.MAP_KEY
            }
        });
        
        if (response.data && response.data.code === 200) {
            return response.data.data;
        } else {
            return [];
        };

        return response.data; // API 응답 데이터 출력

        // 여기서 응답 데이터를 원하는 형태로 가공하거나 활용할 수 있습니다.

    } catch (error) {
        console.error('API 요청 중 오류가 발생했습니다:', error);
    }
}

export default getMap;