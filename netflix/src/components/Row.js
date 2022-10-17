import axios from '../api/axios';
import React, { useEffect, useState } from 'react';
import styles from './Row.module.css';
import MovieModal from './MovieModal/MovieModal';

const Row = ({ title, fetchUrl, isLargeRow, id }) => {
    const [movies, setMovies] = useState([]);

    const [modalOpen, setModalOpen] = useState(false); // modal 창 열지 여부
    const [movieSelected, setMovieSelected] = useState({});

    useEffect(() => {
        fetchMovieData();
    }, []);

    const fetchMovieData = async () => {
        const req = await axios.get(fetchUrl);
        console.log(req);
        setMovies(req.data.results);
    };

    const handleClick = (movie) => {
        setModalOpen(true);
        setMovieSelected(movie);
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
                                onClick={() => handleClick(movie)}
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
            {modalOpen && (
                <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
            )}
        </section>
    );
};

export default Row;
