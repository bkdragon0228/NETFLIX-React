import axios from '../api/axios';
import React, { useEffect, useState } from 'react';
import requests from '../api/requests';
import styled, { css } from 'styled-components';
import styles from './Banner.module.css';
import { NavLink } from 'react-router-dom';

const Banner = styled.header`
    background-image: url(${(props) => props.background});
    background-position: top center;
    background-size: cover;
    color: white;
    object-fit: contian;
    height: 448px;
`;

const Container = styled.div`
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    background-color: black;
`;

const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const Iframe = styled.iframe`
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.65;
    border: none;
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
`;

const MainBanner = () => {
    const [movie, setMovie] = useState([]);
    const [background, setBackground] = useState('');

    const [isCliked, setIsCliked] = useState(false);
    const [isVideo, setIsVideo] = useState(false);

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

        if (movieDetail.videos?.results?.length) {
            setIsVideo(true);
        }
    };

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + '...' : str;
    };

    if (!isCliked) {
        return (
            <Banner className={styles.banner} background={background}>
                <div className={styles.banner__contents}>
                    <h1 className={styles.banner__title}>
                        {movie.title || movie.name || movie.original_name}
                    </h1>
                    <div className={styles.banner__buttons}>
                        {isVideo ? (
                            <button
                                className={`${styles.banner__button} ${styles.play}`}
                                onClick={() => setIsCliked(true)}
                            >
                                play
                            </button>
                        ) : null}

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
    } else {
        return (
            <Container>
                <HomeContainer>
                    <Iframe
                        width="640"
                        height="360"
                        src={`http://youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=0&playlist=${movie.videos.results[0].key}`}
                        frameBorder="0"
                        allow="autoplay; fullscreen"
                        allowFullScreen
                    ></Iframe>
                </HomeContainer>
            </Container>
        );
    }
};

export default MainBanner;
