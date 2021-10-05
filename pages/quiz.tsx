import { useRouter } from "next/router";
import { useState } from "react";
import Button from "../components/ui/Button";
import { getQuiz } from "../rest/quizAPI";
import { Difficulty, QuizOption, QuizData } from "../rest/types/apiType";
import { styled } from "../stitches.config";
import Router from "next/router";

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
  const router = useRouter();
  const [quizIndex, setQuizIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  function checkData() {
    console.log(`render! : ${correctCount}`);
    return props.resCode == 0 ? (
      renderQuiz()
    ) : (
      <div>error : {props.resCode}</div>
      //  TO-DO : response code에 따른 오류 안내 추가
    );
  }

  function renderQuiz() {
    const quizAmount = Number(router.query.amount);
    const quizList: QuizData[] = props.data;
    return (
      <Container>
        <div key={quizList[quizIndex].question}>
          <div>category : {quizList[quizIndex].category}</div>
          <div>difficulty : {quizList[quizIndex].difficulty}</div>
          <div>question : {quizList[quizIndex].question}</div>
          <div onClick={checkCorrect}>
            correct_answer : {quizList[quizIndex].correct_answer}
          </div>
          {quizList[quizIndex].incorrect_answers.map((anwser) => {
            return <div key={anwser}>{anwser}</div>;
          })}
        </div>
        {quizIndex == quizAmount - 1 ? (
          <Button name="Check Score" onClick={goResult} />
        ) : (
          <Button
            name={`Next Quiz(${quizIndex + 1}/${quizAmount})`}
            onClick={nextQuiz}
          />
        )}
      </Container>
    );
  }

  //  Button Component onClick으로 전달하기 위한 wrapper
  function nextQuiz() {
    const quizAmount = Number(router.query.amount);
    if (quizIndex < quizAmount) {
      setQuizIndex((prevQuizCount) => prevQuizCount + 1);
    }
    //  TO-DO : 정답 채점 및 안내 기능 구현
    //  정답여부 저장 -> 상태로 저장 시 렌더링 발생하므로 다른 방법 필요?
  }

  //  결과 페이지로 이동
  function goResult() {
    Router.push(
      {
        pathname: "/result",
        //  TO-DO : query로 채점 결과 전달
      },
      "/result"
    );
  }

  //  TEST CODE
  function checkCorrect() {
    setCorrectCount((prevCorrectCount) => prevCorrectCount + 1);
  }

  return <>{checkData()}</>;
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
  const res = await getQuiz(options);
  const resCode = res.data.response_code;
  const data = res.data.results;
  return {
    props: {
      resCode,
      data,
    },
  };
}
