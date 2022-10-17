import React from 'react';
import styled from 'styled-components';
import requests from '../../api/requests';
import MainBanner from '../../components/MainBanner';
import Row from '../../components/Row';

const MainPageContainer = styled.div`
    background-color: black;
`;

const MainPage = () => {
    return (
        <div>
            <MainBanner />
            <Row
                title="NETFLIX ORIGNALS"
                id="NO"
                fetchUrl={requests.fetchNetflixOriginals}
                isLargeRow
            />
            <Row
                title="Trending now"
                id="TN"
                fetchUrl={requests.fetchTrending}
            />
            <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated} />
        </div>
    );
};

export default MainPage;
