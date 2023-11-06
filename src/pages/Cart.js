import React from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseCount, increaseCount, removeItemFromCart, selectCartList } from '../features/cart/cartSlice';

function Cart(props) {
  const dispatch = useDispatch();
  const cartList = useSelector(selectCartList);

  const formatter = new Intl.NumberFormat('ko-kr')

  return (
    <>
      <Table hover>
        <thead>
          <tr>
            <th>NO</th>
            <th>상품명</th>
            <th>수량</th>
            <th>가격</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr> */}
          {cartList.map((cartItem, index) => {
            return(
            <tr key={cartItem.id}>
              <td>{index + 1}</td>
              <td>{cartItem.title}</td>
              <td>
                <button
                  onClick={() => { dispatch(decreaseCount(cartItem.id)); }}
                >
                  -
                </button>
                {cartItem.count}
                <button
                  onClick={() => {dispatch(increaseCount(cartItem))}}
                >
                  +
                </button>
              </td>
              <td>{formatter.format(cartItem.price * cartItem.count)}원</td>
              {/* 표의 행마다 삭제 버튼 만들고 누르면 상품이 삭제되도록 */}
              <button
                onClick={() => {dispatch(removeItemFromCart(cartItem.id))}}
              >삭제</button>
            </tr>
          );
          })}

          <tr>
            <th>합계</th>
            <td></td>
            <td></td>
            <th>
              {formatter.format(cartList.reduce((prev, cartItem) => {
                return prev + (cartItem.price * cartItem.count);
              }, 0))} 원
            </th>
            <td></td>
            
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default Cart;