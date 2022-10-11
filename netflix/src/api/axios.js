import axios from 'axios';

// axios 인스턴스화
// api 요청시 중복된 부분을 입력하지 않게하기 위해
const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: 'a5a1eb270fa002cab6c71bb37180961c',
        language: 'ko-KR',
    },
});

export default instance;
