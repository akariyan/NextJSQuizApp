import { useRouter } from "next/router";
import { useRef, useState } from "react";
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
import QuizItem, { QuizItemRef } from "../components/QuizItem";

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
  const [quizReslutList, setQuizReslutList] = useState<QuizData[]>(quizList);
  const quizAmount = Number(router.query.amount);
  const quizitemRef = useRef<QuizItemRef>(null);
  const isChecked = useRef(false);
  const recentCorrected = useRef<boolean>(null);

  //  Button Component onClick으로 전달하기 위한 wrapper
  function nextQuiz() {
    const quizAmount = Number(router.query.amount);
    if (quizIndex < quizAmount) {
      isChecked.current = false;
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

  function checkCorrect() {
    isChecked.current = true; //  값 검증 완료됐으므로 버튼 변경을 위해 flag 변경
    let updatedList = quizReslutList;
    if (quizitemRef.current.checkAnswer()) {
      recentCorrected.current = true;
      updatedList[quizIndex].isCorrect = true;
    } else {
      recentCorrected.current = true;
      updatedList[quizIndex].isCorrect = false;
    }
    setQuizReslutList([...updatedList]); //  수정된 배열을 새 배열로 인식시켜 렌더링 발생시킴
  }

  function renderButton(): JSX.Element {
    if (!isChecked.current) {
      //  정답 체크 전
      return (
        <Button onClick={checkCorrect}>
          Check Answer({quizIndex + 1}/{quizAmount})
        </Button>
      );
    } else {
      //  TO-DO : alert -> 정답 여부 알려주는 별도 UI 추가
      if (recentCorrected.current == true) {
        alert("정답!");
        recentCorrected.current = null;
      } else if (recentCorrected.current == false) {
        alert("오답!");
        recentCorrected.current = null;
      }
      if (quizIndex == quizAmount - 1) {
        //  마지막 문제에서 정답 체크 후
        return <Button onClick={goResult}>Check Score</Button>;
      } else {
        //  정답 체크 후
        return (
          <Button onClick={nextQuiz}>
            Next Quiz({quizIndex + 1}/{quizAmount})
          </Button>
        );
      }
    }
  }

  return (
    <>
      {resCode == 0 ? (
        <Container>
          <QuizItem
            item={quizList[quizIndex]}
            index={quizIndex}
            ref={quizitemRef}
          />
          {renderButton()}
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
