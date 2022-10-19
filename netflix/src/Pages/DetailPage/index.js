import axios from '../../api/axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailPage = () => {
    let { movieId } = useParams();
    const [movie, setMovie] = useState({});

    useEffect(() => {
        fetchData();
    }, [movieId]);

    const fetchData = async () => {
        const request = await axios.get(`/movie/${movieId}`);
        setMovie(request.data);
    };

    if (!movie) return <div>...loading</div>;

    return (
        <section>
            <img
                className="modal__poster-img"
                alt="image"
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            ></img>
        </section>
    );
};

export default DetailPage;
