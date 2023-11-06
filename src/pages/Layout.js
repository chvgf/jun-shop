import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // bootstrap CSS 추가
import styled, { createGlobalStyle } from "styled-components";
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';



function Layout(props) {
  const navigate = useNavigate();

  return (
    <>    
      <header>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="#" onClick={() => navigate('/')}>준우 샵</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate('/')}>홈</Nav.Link>
              <Nav.Link onClick={() => navigate('/cart')}>장바구니</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </header>

      <Outlet />   {/* 자식 라우트들 여기에 보이게 하기 */}

      {/* <footer>푸터 영역</footer> */}
    </>
  );
}

export default Layout;