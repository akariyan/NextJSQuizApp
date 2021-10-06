import { QuizData } from "../rest/types/apiType";

interface IProps {
  item: QuizData;
  callback?: (boolean) => void;
}

export default function QuizItem({ item }: IProps) {
  function checkAnswer() {
    // 정답 여부 체크 후 callback을 통해 부모에게 정답 여부 전달
  }

  const correctAnswer = item.correct_answer;
  const answers = [...item.incorrect_answers, correctAnswer];
  const shuffledAnswers = answers.sort(() => Math.random() - Math.random());

  const mapValue = shuffledAnswers.map((answer, idx) =>
    answer == correctAnswer ? (
      <div className="answer" key={idx}>
        {answer}
      </div>
    ) : (
      <div className="answer" key={idx}>
        {answer}
      </div>
    )
  );

  return (
    <div key={item.question}>
      <div className="question">question : {item.question}</div>
      <div className="category">category : {item.category}</div>
      <div className="difficulty">difficulty : {item.difficulty}</div>
      {<div>{mapValue}</div>}
    </div>
  );
}
