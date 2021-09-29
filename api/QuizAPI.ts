import apiClient from "./apiClient";
import { QuizOption, QuizResponse } from "./types/apiType";

export function getQuiz(option: QuizOption) {
  return apiClient.get<QuizResponse>("/", {
    params: {
      ...option,
      type: "multiple",
    },
  });
}
