import axios, { AxiosResponse } from "axios";
import { QuizResponse, Quiz } from "../types/QuizAPIResponse";

const baseUrl = "https://opentdb.com/api.php";

export function setQuizOption(
  amount: number,
  category: number,
  difficulty: string
) {
  return `${baseUrl}?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
}

export async function getQuiz(url: string): Promise<QuizResponse> {
  const res = await axios.get(url);
  const data = await res.data;

  return {
    response_code: data.response_code,
    results: data.results,
  };
}
