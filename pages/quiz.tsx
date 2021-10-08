import { useRouter } from "next/router";
import { useState } from "react";
import Button from "../components/ui/Button";
import { getQuiz } from "../rest/quizAPI";
import {
  Difficulty,
  QuizOption,
  QuizData,
  responseCode,
} from "../rest/types/apiType";
import { styled } from "../stitches.config";
import Router from "next/router";
import QuizItem from "../components/QuizItem";

const Container = styled("div", {
  gridArea: "main",
  display: "grid",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "3fr 0.5fr",
  paddingLeft: "30vw",
  paddingRight: "30vw",
  ":last-child": {
    gridColumnStart: 1,
    gridColumnEnd: 3,
  },
});

interface QuizProp {
  resCode: responseCode;
  quizList: QuizData[];
}

export default function Quiz({ resCode, quizList }: QuizProp) {
  const router = useRouter();
  const [quizIndex, setQuizIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const quizAmount = Number(router.query.amount);
  // const quizList: QuizData[] = data;

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

  return (
    <>
      {resCode == 0 ? (
        <Container>
          <QuizItem item={quizList[quizIndex]} index={quizIndex} />
          {quizIndex == quizAmount - 1 ? (
            <Button onClick={goResult}>Check Score</Button>
          ) : (
            <Button onClick={nextQuiz}>
              Next Quiz({quizIndex + 1}/{quizAmount})
            </Button>
          )}
        </Container>
      ) : (
        <div>error : {resCode}</div>
      )}
    </>
  );
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
      quizList: data,
    },
  };
}
