import React from 'react';
import { Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// 커서포인터 주기 아이템에
// 방법1: 스타일드 컴포넌트로 스타일 확장 Col 대신 이거 입력
// const StyledCol = styled(Col)`
//   cursor: pointer;
// `;
// 방법2: GlobalStyle에 공통 스타일로 만들어논 .커서-포인터 클래스 넣기

function ProductListItem(props) {
  const { productListItem: { title, price, imagePath, id } } = props;
  console.log(props.productListItem);

  const navigate = useNavigate();

  return (
    <Col md={4} className='cursor-pointer'>
      <img src= {imagePath} width="80%" 
        // 상품 클릭 시 이동 경로 설정하기
        onClick={() => {
          // /detail/해당 상품 id
          navigate(`/detail/${id}`)
        }}
      />
      <h4>{title}</h4>
      <p>{price}원~</p>
    </Col>
  );
}

export default ProductListItem;