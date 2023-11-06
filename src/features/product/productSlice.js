import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMoreProducts } from "../../api/productAPI";

const initialState = {
  productList: [],
  selectedProduct: null,
  status: 'idle', // API 요청 상태
};

// thunk를 이용한 비동기 작업 처리하기 
// thunk 미들웨어: 액션을 디스패치 했을 때 리듀서에서 이를 쳐리하기 앞서 사전에 지정된 작업을 실행
// 액션과 리듀서 중간에 끼어있는 중간자 역할, 액션 -> (미들웨어) -> 리듀서
// 주로 API 요청 같은 비동기 작업을 수행할 때 사용

// thunk를 이용한 비동기 작업 처리 시 이점?
// 1) API 요청에 대한 상태 관리 쉽게 가능(요청 시작-로딩중, 요청이 성공 또는 실패 시 로딩이 끝났음을 명시)
// 2) 요청이 성공하면 응답에 대한 상태 관리, 실패하면 에러에 대한 상태 관리가 쉬움

// createAsyncThunk()는 비동기 작업을 처리하는 액션 함수를 반환함
export const getMoreProductAsync = createAsyncThunk(
  'product/getMoreProductAsync', // 첫번째 인자값: action type(개발자 임의로 작성)
  async () => { // 두번째 인자값: action이 발생했을 때 실행할 비동기 작업(api 요청 같은)
    const result = await getMoreProducts(); // 비동기 함수 실행 시 'pending' 상태 
    return result; // 값을 반환하면 'fullfilled' 상태로 바뀌고 action.payload에 담겨 리듀서 함수로 전달됨
  }
);

// 상품 정보를 담을 slice 만들기
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getAllProducts: (state, action) => {
      state.productList = action.payload;
    },
    getSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    addMoreProducts: (state, action) => {
      state.productList.push(...action.payload);
    },
  },
  // thunk를 이용한 비동기적인 작업에는 extraReducers를 사용
  extraReducers: (builder) => {
    builder
      .addCase(getMoreProductAsync.pending, (state) => { // pending 상태 일 때 동작할 리듀서
        state.status = 'loading';
      })
      .addCase(getMoreProductAsync.fulfilled, (state, action) => { // fulfilled 상태 일 때 동작할 리듀서
        state.status = 'idle'; // complete, success 등
        state.productList.push(...action.payload);
      })
      .addCase(getMoreProductAsync.rejected, (state) => { // rejected 상태 일 때 동작할 리듀서
        state.status = 'fail';
      })
  }
});

// 액션 생성 함수
export const { getAllProducts, getSelectedProduct, clearSelectedProduct, addMoreProducts } = productSlice.actions;

// 선택자 함수
export const selectProductList = (state) => state.product.productList;
export const selectSelectedProduct = (state) => state.product.selectedProduct;
export const selectStatus = (state) => state.product.status;

// 리듀스 함수들
export default productSlice.reducer;