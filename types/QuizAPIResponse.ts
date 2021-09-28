export interface QuizResponse {
  response_code: number;
  results: Array<Quiz>;
}

export interface Quiz {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: Array<string>;
}
