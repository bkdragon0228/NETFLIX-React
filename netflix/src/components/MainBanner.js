import axios from '../api/axios';
import React, { useEffect, useState } from 'react';
import requests from '../api/requests';
import styled, { css } from 'styled-components';
import styles from './Banner.module.css';

const Banner = styled.header`
    background-image: url(${(props) => props.background});
    background-position: top center;
    background-size: cover;
    color: white;
    object-fit: contian;
    height: 448px;
`;

const MainBanner = () => {
    const [movie, setMovie] = useState([]);
    const [background, setBackground] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        // 현재 상영중인 영화 정보 다가져오기
        const request = await axios.get(requests.fetchNowPlaying);
        // 여러 영화 중에 영화 하나의 id를 랜덤하게 가져오기
        const movieId =
            request.data.results[
                Math.floor(Math.random() * request.data.results.length)
            ].id;
        // 랜덤하게 골라진 영화의 상세 정보를 가져오기
        const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
            params: { append_to_response: 'videos' },
        });
        setMovie(movieDetail);
        console.log(movieDetail);
        setBackground(
            'https://image.tmdb.org/t/p/original/' + movieDetail.backdrop_path
        );
    };

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + '...' : str;
    };

    return (
        <Banner
            className={styles.banner}
            background={background}
            // style={{
            //     backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
            //     backgroundPosition: 'top center',
            //     backgroundSize: 'cover',
            // }}
        >
            <div className={styles.banner__contents}>
                <h1 className={styles.banner__title}>
                    {movie.title || movie.name || movie.original_name}
                </h1>
                <div className={styles.banner__buttons}>
                    <button
                        className={`${styles.banner__button} ${styles.play}`}
                    >
                        play
                    </button>
                    <button
                        className={`${styles.banner__button} ${styles.info}`}
                    >
                        More Infomation
                    </button>
                </div>
                <h1 className={styles.banner__description}>
                    {truncate(movie.overview, 100)}
                </h1>
            </div>
            <div className={styles.fadeBottom} />
        </Banner>
    );
};

export default MainBanner;
