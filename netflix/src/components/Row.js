import axios from '../api/axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import styles from './Row.module.css';

const Row = ({ title, fetchUrl, isLargeRow, id }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchMovieData();
    }, []);

    const fetchMovieData = async () => {
        const req = await axios.get(fetchUrl);
        console.log(req);
        setMovies(req.data.results);
    };
    return (
        <section className={styles.row}>
            <h2>{title}</h2>
            <div className={styles.slider}>
                <div className={styles.slider__arrowLeft}>
                    <span
                        className={styles.arrow}
                        onClick={() => {
                            document.getElementById(id).scrollLeft -=
                                window.innerWidth - 80;
                        }}
                    >
                        {'<'}
                    </span>
                </div>
                <div id={id} className={styles.row__posters}>
                    {movies.map((movie) => {
                        return (
                            <img
                                key={movie.id}
                                className={`${styles.row__poster} ${
                                    isLargeRow && styles.row__posterLarge
                                }`}
                                src={`https://image.tmdb.org/t/p/original/${
                                    isLargeRow
                                        ? movie.poster_path
                                        : movie.backdrop_path
                                }`}
                                alt={movie.name}
                            />
                        );
                    })}
                </div>
                <div className={styles.slider__arrowRight}>
                    <span
                        className={styles.arrow}
                        onClick={() => {
                            document.getElementById(id).scrollLeft +=
                                window.innerWidth - 80;
                        }}
                    >
                        {'>'}
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Row;
