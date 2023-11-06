import axios from "axios";
// 상품과 관련된 api 요청 함수들을 정의
// 가독성도 좋고 여러곳에서 재사용할 수 있도록 함수로 만듦

// 상품 목록 조회
export const getProducts = async () => {
  try {
    const response = await axios.get('https://my-json-server.typicode.com/chvgf/db.json/products');

    if (response.status === 200) { // 요청에 대한 응답의 상태가 200(OK) 일때만 결과를 리턴
      return response.data;
    } else {
      throw new Error(`api error: ${response.status} ${response.statusText}`);
    }

  } catch (error) { // 서버가 죽었거나, 인터넷이 도중에 끊겼거나, URL이 잘못됐을 때 등
    console.error(error);
  }
};

// 특정 상품 조회
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`https://my-json-server.typicode.com/chvgf/db.json/products/${id}`);

    if (response.status === 200) { // 요청에 대한 응답의 상태가 200(OK) 일때만 결과를 리턴
      return response.data;
    } else {
      throw new Error(`api error: ${response.status} ${response.statusText}`);
    }

  } catch (error) { // 서버가 죽었거나, 인터넷이 도중에 끊겼거나, URL이 잘못됐을 때 등
    console.error(error);
  }
};

// 상품 더보기
export const getMoreProducts = async () => {
  try {
    const response = await axios.get('https://my-json-server.typicode.com/chvgf/db.json/more-products');

    if (response.status === 200) { // 요청에 대한 응답의 상태가 200(OK) 일때만 결과를 리턴
      return response.data;
    } else {
      throw new Error(`api error: ${response.status} ${response.statusText}`);
    }

  } catch (error) { // 서버가 죽었거나, 인터넷이 도중에 끊겼거나, URL이 잘못됐을 때 등
    console.error(error);
  }
};

// 만약 서버로 데이터를 보내야 한다면?
// json-sever 이용 시 테스트 가능
export const orderProducts = async (productId, orderCount) => {
  try {
    const response = await axios.post('https://my-json-server.typicode.com/chvgf/db.json/product-order', { productId, orderCount });

    if (response.status === 200) { // 요청에 대한 응답의 상태가 200(OK) 일때만 결과를 리턴
      return response.data;
    } else {
      throw new Error(`api error: ${response.status} ${response.statusText}`);
    }

  } catch (error) { // 서버가 죽었거나, 인터넷이 도중에 끊겼거나, URL이 잘못됐을 때 등
    console.error(error);
  }
};
