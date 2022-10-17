import Nav from './components/Nav';
import Footer from './components/Footer';
import { Outlet, Route, Routes } from 'react-router-dom';
import MainPage from './Pages/Mainpage';
import DetailPage from './Pages/DetailPage';
import SearchPage from './Pages/SearchPage';

const Layout = () => {
    return (
        <div>
            <Nav />
            {/* 레이아웃에서 중첩라우팅을 보여주기위한 */}
            <Outlet />
            <Footer />
        </div>
    );
};

function App() {
    return (
        <div className="App" style={{ backgroundColor: 'black' }}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* 중첩라우팅 레이아웃의 역할을 하고 index 속성을 가지고 있는 라우트가 메인으로 온다. */}
                    <Route index element={<MainPage />} />
                    <Route path=":movieId" element={<DetailPage />} />
                    <Route path="search" element={<SearchPage />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
