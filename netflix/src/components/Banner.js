import axios from '../api/axios';
import React, { useEffect, useState } from 'react';
import requests from '../api/requests';

const Banner = () => {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        // 현재 상영중인 영화 정보 다가져오기
        const request = await axios.get(requests.fetchNowPlaying);

        console.log(request);
        // 여러 영화 중에 영화 하나의 id를 랜덤하게 가져오기
        const movieId =
            request.data.results[
                Math.floor(Math.random() * request.data.results.length)
            ].id;
        // 랜eja하게 골라진 영화의 상세 정보를 가져오기
        const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
            params: { append_to_response: 'videos' },
        });
        setMovie(movieDetail);
    };

    return <div>Banner</div>;
};

export default Banner;
