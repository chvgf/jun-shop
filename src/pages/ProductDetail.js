import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Form, Modal, Nav, Row, TabContent } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearSelectedProduct, getSelectedProduct, selectSelectedProduct } from '../features/product/productSlice';
import styled, { keyframes } from 'styled-components';
import { toast } from 'react-toastify';
import TabContents from '../components/TabContents';
import { addItemToCart } from '../features/cart/cartSlice';

// 스타일드 컴포넌트를 이용한 애니메이션 속성 적용
const highlight = keyframes`
  from {background-color: #cff4fc;}
  50% {background-color: #e8f7fa;}
  to {background-color: #cff4fc;}
`;
const StyledAlert = styled(Alert)`
  animation: ${highlight} 1s linear infinite;
`;


function ProductDetail(props) {
  const [oderCount, setOderCount] = useState(1);
  const funOderCount = (e) => {
    // 숫자 외 입력 시 유효성 검사
    if (isNaN(e.target.value)) {
      toast.error('❌숫자만 입력하세요');
      return;
    }
    setOderCount(Number(e.target.value))
  }
  // URL 파라미터 가져오기
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectSelectedProduct);

  // 숫자 포맷 적용
  const formatter = new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' });

  const [alert, setAlert] = useState(true);
  const [showTabIndex, setShowTabIndex] = useState(0); // 탭 상태
  const [showTab, setShowTab] = useState('detail');
  const [showModal, setShowModal] = useState(false); // 모달 상태
  const handleCloseModal = () => setShowModal(false)
  const handleOpenModal = () => setShowModal(true)
  const navigate = useNavigate();
  
  // 처음 마운트 됐을 때 서버에 상품 id를 이용하여 데이터를 요청하고
  // 그 결과를 리덕스 스토어에 저장
  useEffect(() => { 

    // 서버에 특정 상품의 데이터 요청
    const fetchProductById = async () => {
      try {
        const response = await axios.get(`https://my-json-server.typicode.com/chvgf/db.json/products/${productId}`)
        dispatch(getSelectedProduct(response.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductById();

    // 상세 페이지가 언마운트 될 때 전역 상태 초기화
    return () => {
      dispatch(clearSelectedProduct());
    }
  }, []);

  useEffect(() => {
    // alert 띄우고 3초뒤에 사라지게 만들기
    const timeout = setTimeout(() => {
      setAlert(false)
    },3000);

    // 불필요하게 타이머가 계속 쌓이는 것을 정리
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  // 상품 상세페이지에 들어갔을 때 해당 상품이 존재할때만 id값을 localStorage에 추가
  useEffect(() => {
    console.log(product);
    if (!product) return

    let latestViewed = JSON.parse(localStorage.getItem('latestViewed')) || []; // 처음에 null이니까 기본값으로 빈배열 넣어줌
    // id값을 넣기 전에 기존 배열에 존재하는지 검사하거나
    // 아니면 일단 넣고 set 자료형을 이용하여 중복 제거(간편함)
    latestViewed.push(product.id);
    latestViewed = new Set(latestViewed); // 배열을 Set 객체로 만듦 (중복제거)
    latestViewed = [...latestViewed]; // Set 객체를 다시 배열로 변환
    localStorage.setItem('latestViewed', JSON.stringify(latestViewed)); // JSON 문자열로 저장
  }, [product]);
  
  // 없는 상품일 때 예외 처리
  if (!product) {
    return null; // 아무것도 렌더링하지 않음
  }

  return (
    <Container className='pt-3'>
      {/* Alert을 띄우고 3초뒤에 사라지게 만들기
        힌트: 처음 렌더링 됐을 때 setTimeout으로 타이머 설정 */}
      { alert ? <StyledAlert variant="info" onClose={() => setAlert(false)} dismissible>
        현재 1{Math.round(Math.random())}명이 이 상품을 보고 있습니다.
      </StyledAlert> : alert }

      <Row>
        <Col md={6}>
          <img src={product.imagePath} width="80%"/>
        </Col>
        <Col md={6} >
          <h4 className='pt-5'>{product.title}</h4>
          <p>{product.content}</p>
          <p>{ formatter.format(product.price)}원</p>

          <Col md={4} className='m-auto mb-3'>
          <Form.Control type="text" value={oderCount} onChange={funOderCount} />
          </Col>

          <Button variant='primary'>주문하기</Button>
          <Button variant='warning' 
            onClick={
          //     () => {dispatch(addItemToCart({ 
          //     id: product.id,
          //     title: product.title,
          //     price: product.price,
          //     count: oderCount
          // }))}
              () =>
                {dispatch(addItemToCart({ 
                  ...product,
                  count: oderCount
          }))
                handleOpenModal();
        }}
          >
            장바구니 담기</Button>
        </Col>
      </Row>

      {/* 탭 버튼 UI 만들기 */}
      <Nav variant="tabs" defaultActiveKey="link-0" className='my-3'>
        <Nav.Item>
          {/* <Nav.Link eventKey="link-0"onClick={() => setShowTabIndex(0)}>상세정보</Nav.Link> */}
          <Nav.Link eventKey="link-0"onClick={() => setShowTab('detail')}>상세정보</Nav.Link>
          </Nav.Item>
        <Nav.Item>
          {/* <Nav.Link eventKey="link-1"onClick={() => setShowTabIndex(1)}>리뷰</Nav.Link> */}
          <Nav.Link eventKey="link-1"onClick={() => setShowTab('review')}>리뷰</Nav.Link>
          </Nav.Item>
        <Nav.Item>
          {/* <Nav.Link eventKey="link-2"onClick={() => setShowTabIndex(2)}>Q&amp;A</Nav.Link> */}
          <Nav.Link eventKey="link-2"onClick={() => setShowTab('qa')}>Q&amp;A</Nav.Link>
          </Nav.Item>
        <Nav.Item>
          {/* <Nav.Link eventKey="link-3"onClick={() => setShowTabIndex(3)}>반품/교환정보</Nav.Link> */}
          <Nav.Link eventKey="link-3"onClick={() => setShowTab('exchange')}>반품/교환정보</Nav.Link>
          </Nav.Item>
      </Nav>

      {/* 탭의 내용을 다 만들어 놓고 조건부 랜더링하면 됨 */}
      {/* 방법1: 삼항 연산자 사용(가독성 나쁨) */}
      {/* {showTabIndex === 0 
        ? <div>탭 내용1</div>
        : showTabIndex === 1
          ? <div>탭 내용2</div>
          : showTabIndex === 2
            ? <div>탭 내용3</div>
            : showTabIndex === 3
              ? <div>탭 내용4</div>
              : null
        } */}

        {/* 방법2: 컴포넌트로 추출 */}
        {/* <TabContents showTabIndex={showTabIndex}/> */}

        {/* 방법3: 배열이나 객체 형태로 만들어서 조건부 렌더링(편법너낌) */}
        {/* 배열 형태 */}
        {/* {
          [
            <div>탭 내용1</div>,
            <div>탭 내용2</div>,
            <div>탭 내용3</div>,
            <div>탭 내용4</div>ㄴ
          ][showTabIndex]
        } */}
        {/* Quiz: 객체 형태 */}
        {
          {
            'detail': <div>탭 내용1</div>,
            'review': <div>탭 내용2</div>,
            'qa': <div>탭 내용3</div>,
            'exchange': <div>탭 내용4</div>,
          }[showTab] // state 하나 만들어다가
        }

        {/* 장바구니에 담긴 모달 만들기 
            추후 공통 모달로 만드는 것이 좋다*/}
            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>💱준우네 샵 알림</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                장바구니에 상품을 담았습니다. <br/>
                장바구니로 이동하시겠습니까?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  취소
                </Button>
                <Button variant="primary" onClick={() => navigate('/cart')}>
                  확인
                </Button>
              </Modal.Footer>
            </Modal>

    </Container>
  );
}

export default ProductDetail;