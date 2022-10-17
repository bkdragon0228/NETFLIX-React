import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import styles from './Nav.module.css';

const Navi = styled.nav`
    position: fixed;
    top: 0; // navigation bar의 위치를 고정
    width: 100%;
    height: 30px;
    z-index: 1; // 위치를 앞으로 뺴주기 위해
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition-timing-function: ease-in;
    transition: all 0.5s;
`;

// const Navi_black = styled(Navi)`
//     background-color: black;
// `;

const Avatar = styled.img`
    position: fixed;
    right: 40px;
    width: 30px;
    object-fit: contain; // 이미지 크기 맞춤 조절
`;

const Logo = styled.img`
    position: fixed;
    left: 40px;
    width: 80px;
    object-fit: contain;
`;

const NavInput = styled.input`
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0);
    background-color: rgba(0, 0, 0, 0.382);
    border-radius: 5px;
    color: white;
    padding: 5px;
    border: none;
`;

const Nav = () => {
    const [show, setShow] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                setShow(true);
            } else {
                setShow(false);
            }
        });

        return () => {
            window.removeEventListener('scroll', () => {});
        };
    }, []);

    const handleChange = (e) => {
        setSearchValue(e.target.value);
        navigate(`/search?q=${e.target.value}`);
    };

    return (
        <Navi className={show ? styles.black : styles.lowBlack}>
            <Logo
                alt="Netflix_logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png"
                className="nav__logo"
                onClick={() => navigate('/')}
            />
            <NavInput
                type="text"
                value={searchValue}
                onChange={handleChange}
                placeholder="영화를 검색해주세요"
            ></NavInput>
            <Avatar
                alt="user logged"
                src="https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41"
                className="nav__avatar"
            />
        </Navi>
    );
};

export default Nav;
