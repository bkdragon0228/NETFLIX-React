import requests from './api/requests';
import MainBanner from './components/MainBanner';
import Nav from './components/Nav';
import Row from './components/Row';

function App() {
    return (
        <div className="App" style={{ backgroundColor: 'black' }}>
            <div>hello</div>
            <Nav />
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
}

export default App;
