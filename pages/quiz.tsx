import { useRouter } from "next/router";
import {
  ChangeEvent,
  ReactElement,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
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
  const quizAmount = Number(router.query.amount);

  const [quizIndex, setQuizIndex] = useState(0);
  const [quizResultList, setQuizResultList] = useState<QuizData[]>(quizList);
  const [buttonLabel, setButtonLabel] = useState("Check answer"); //  버튼 문구 : 퀴즈 풀이 상태 / index에 따라 변경
  const [currentSelectedValue, setCurrentSelectedValue] = useState(null); //  자식인 quizitem에서 현재 선택된 radio input의 value

  //  자식인 QuizItem에서 발생한 select 이벤트를 통해 현재 선택된 값을 상태로 저장
  const onSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentSelectedValue(e.target.value);
  };

  //  버튼 클릭시
  function quizOnClick() {
    if (currentSelectedValue === null) {
      //  TO-DO : alert -> 안내 UI 추가
      alert("Please choice your awnser");
      return;
    }

    //  quizlist[index].iscorrect로 null 오답 정답 여부 체크로 onclick 동작 분기
    if (quizResultList[quizIndex].isCorrect === undefined) {
      //  정답 체크 전

      //  정답 체크
      const modifiedList = quizResultList.map((item, idx) => {
        if (idx === quizIndex) {
          console.log(`선택한 값 : ${currentSelectedValue}`);
          item.isCorrect = currentSelectedValue === item.correct_answer;
        }
        return item;
      });
      setQuizResultList([...modifiedList]);

      //  TO-DO : alert -> 정답 여부 알려주는 별도 UI 추가
      if (quizResultList[quizIndex].isCorrect) {
        alert("correct awnser!");
      } else {
        alert("wrong awnser!");
      }

      //  버튼 변경
      if (quizIndex === quizAmount - 1) {
        setButtonLabel("Check your score!");
      } else {
        setButtonLabel(`Next quiz(${quizIndex + 1}/${quizAmount})`);
      }
    } else {
      //  정답 체크 후

      if (quizIndex === quizAmount - 1) {
        //  마지막 퀴즈일 경우 : 결과 페이지로 이동
        Router.push(
          {
            pathname: "/result",
            //  TO-DO : query로 채점 결과 전달
          },
          "/result"
        );
      } else {
        //  마지막이 아닐 경우 다음 퀴즈로 이동
        setCurrentSelectedValue(null);
        setButtonLabel("Check Answer");
        setQuizIndex((prevQuizCount) => prevQuizCount + 1);
      }
    }
  }

  //  FOR DEBUG
  console.log(quizResultList[quizIndex].correct_answer);
  return (
    <>
      {resCode === 0 ? (
        <Container>
          <QuizItem
            quiz={quizResultList[quizIndex]}
            index={quizIndex}
            onSelectChange={onSelectChange}
          />
          <Button onClick={quizOnClick}>{buttonLabel}</Button>
        </Container>
      ) : (
        // TO-DO : resCode에 따른 에러 문구 출력
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
  const originData = res.data.results;

  //  정답과 오답을 섞은 출력용 리스트 할당
  const data = originData.map((quiz) => {
    quiz.answerList = [...quiz.incorrect_answers, quiz.correct_answer].sort(
      () => Math.random() - Math.random()
    );
    return quiz;
  });

  return {
    props: {
      resCode,
      quizList: data,
    },
  };
}
