import axios from '../../api/axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchPage.css';

const SearchPage = () => {
    const [searchResults, setSearchResults] = useState([]);

    const useQuery = () => {
        return new URLSearchParams(useLocation().search); //현재 url 정보 가져오기
    };

    let query = useQuery();

    const searchTerm = query.get('q'); // useLocation에서 원하는 부분만 가져오기
    console.log('searchTerm', searchTerm);

    useEffect(() => {
        if (searchTerm) {
            fetchSearchMovie(searchTerm);
        }
    }, [searchTerm]);

    const fetchSearchMovie = async (searchTerm) => {
        try {
            const req = await axios.get(
                `/search/multi?include_adult=false&query=${searchTerm}`
            );
            console.log(req);
            setSearchResults(req.data.results);
        } catch (error) {
            console.log(error);
        }
    };

    const renderSearchResults = () => {
        return searchResults.length > 0 ? (
            <section className="search-container">
                {searchResults.map((movie) => {
                    if (
                        movie.backdrop_path !== null &&
                        movie.media_type !== 'person'
                    ) {
                        const movieImageURL =
                            'http://image.tmdb.org/t/p/w500' +
                            movie.backdrop_path;

                        return (
                            <div className="movie">
                                <div className="movie__column-poster">
                                    <img
                                        src={movieImageURL}
                                        alt="movie"
                                        className="movie__poster"
                                    ></img>
                                </div>
                            </div>
                        );
                    }
                })}
            </section>
        ) : (
            <section className="no-results">
                <div className="no-result__text">
                    <p>
                        찾고자하는 검색어"{searchTerm}"에 맞는 영화가 없습니다."
                    </p>
                </div>
            </section>
        );
    };

    return renderSearchResults();
};

export default SearchPage;
