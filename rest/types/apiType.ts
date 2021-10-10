export type Difficulty = "easy" | "medium" | "hard";

export interface QuizOption {
  amount: number;
  category?: number; //  null일 경우 모든 카테고리로 설정
  difficulty?: Difficulty; //  null일 경우 모든 난이도로 설정
}

/**
 * Code 0: 성공적인 결과 반환
 * Code 1: 쿼리 범위 오류로 인해 결과 없음
 * Code 2: 쿼리 내 인자 오류 - ex)정수 자리에 문자가 옴
 * Code 3: 세션 토큰을 찾을수 없음
 * Code 4: 토큰 만료
 * 출처 : https://opentdb.com/api_config.php
 */
export type responseCode = 0 | 1 | 2 | 3 | 4;

export interface QuizResponse {
  response_code: responseCode;
  results?: QuizData[]; //  responsecode 0을 제외하고는 전부 results가 없으므로 nullable
}

export interface QuizData {
  category: string;
  type: string;
  difficulty: Difficulty;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answerList?: string[];
  isCorrect?: boolean;
}
