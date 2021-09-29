import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL; //  .env 파일에 정의한 API Base URL 가져오기

const apiClient = axios.create({
  baseURL,
  timeout: 5000, //  axios는 timeout default value가 없음
});

export default apiClient;
