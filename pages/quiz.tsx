import { getQuiz } from "../rest/quizAPI";
import { Difficulty, QuizOption, QuizData } from "../rest/types/apiType";
import { styled } from "../stitches.config";

export default function Quiz(props) {
  const Container = styled("div", {
    gridArea: "main",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    paddingLeft: "30vw",
    paddingRight: "30vw",
    ":last-child": {
      gridColumnStart: 1,
      gridColumnEnd: 3,
    },
  });

  function renderQuiz(quiz: QuizData) {
    return (
      <div key={quiz.question}>
        <div>category : {quiz.category}</div>
        <div>difficulty : {quiz.difficulty}</div>
        <div>question : {quiz.question}</div>
        <div>correct_answer : {quiz.correct_answer}</div>
        {quiz.incorrect_answers.map((anwser) => {
          <div key={anwser}>{anwser}</div>;
        })}
      </div>
    );
  }

  return <Container>{props.data.map((quiz) => renderQuiz(quiz))}</Container>;
}

//  next/router로 이동할때 server에서 pre-rendering해놓은 html 던져주면서 호출?
export async function getServerSideProps(context) {
  const options: QuizOption = {
    amount: Number(context.query.amount),
    category: context.query.category ? context.query.category : undefined,
    difficulty: context.query.difficulty
      ? (context.query.difficulty as Difficulty)
      : undefined,
  };
  const result = await getQuiz(options);
  const data = result.data.results;

  return {
    props: {
      data,
    },
  };
}
