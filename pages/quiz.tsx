import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
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
import Modal from "../components/ui/Modal";

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

const ErrorPage = styled("div", {
  gridArea: "main",
  display: "grid",
  gridTemplateRows: "1fr 3fr",
  paddingLeft: "30vw",
  paddingRight: "30vw",
  lineHeight: "5em",
  ".error-header": {
    color: "$red",
    fontSize: "3em",
    fontWeight: "bold",
  },
  ".error-body": {
    fontSize: "2em",
  },
});

interface QuizProps {
  resCode: responseCode;
  quizList: QuizData[];
}

const resCodeHeader = (resCode: number) => {
  switch (resCode) {
    case 1:
      return "No Quiz Result";
    case 2:
      return "Quiz Option Error";
    case 3:
    case 4:
      return "Quiz Server Communication Error";
  }
};

const resCodeBody = (resCode: number) => {
  switch (resCode) {
    case 1:
      return "Try again with another option.\ne.g)Asking for 50 Questions in a Category that only has 20.";
    case 2:
      return "Try again with another option.\ne.g)number paramater is not number";
    case 3:
    case 4:
      return "Please try again.";
  }
};

function Quiz({ resCode, quizList }: QuizProps) {
  const router = useRouter();
  const quizAmount = Number(router.query.amount);

  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizResultList, setQuizResultList] = useState<QuizData[]>(quizList);
  const [buttonLabel, setButtonLabel] = useState<string>("Check answer"); //  버튼 문구 : 퀴즈 풀이 상태 / index에 따라 변경
  const [currentSelectedValue, setCurrentSelectedValue] =
    useState<string>(null); //  자식인 quizitem에서 현재 선택된 radio input의 value
  const [startTime, setStartTime] = useState<number>(new Date().getTime()); //  퀴즈 시작 시간
  const [showCheckModal, setShowCheckModal] = useState<boolean>(false);
  const [showAnswerModal, setShowAnswerModal] = useState<boolean>(false);

  //  자식인 QuizItem에서 발생한 select 이벤트를 통해 현재 선택된 값을 상태로 저장
  const onSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentSelectedValue(e.target.value);
    setQuizResultList((prevState) => {
      return prevState.map((quiz, quizindex) => {
        if (quizIndex === quizindex) {
          // es6 array helper methods
          const selectIndex = quiz.answerList.findIndex(
            (answer) => answer === e.target.value
          );
          return {
            ...quiz,
            userSelectedIndex: selectIndex,
          };
        } else {
          return {
            ...quiz,
          };
        }
      });
    });
  };

  //  버튼 클릭시
  function onQuizClick() {
    if (currentSelectedValue === null) {
      setShowCheckModal(true);
      return;
    }

    //  quizlist[index].iscorrect로 null 오답 정답 여부 체크로 onclick 동작 분기
    if (quizResultList[quizIndex].isCorrect === undefined) {
      //  정답 체크 전

      //  정답 체크
      const modifiedList = quizResultList.map((item, index) => {
        if (index === quizIndex) {
          return {
            ...item,
            isCorrect: currentSelectedValue === item.correct_answer,
          };
        } else {
          return item;
        }
      });

      // setState -> asnyc
      setQuizResultList(modifiedList); // -> event callback
      //  버튼 변경
      if (quizIndex === quizAmount - 1) {
        setButtonLabel("Check your score!");
      } else {
        setButtonLabel(`Next quiz(${quizIndex + 1}/${quizAmount})`);
      }
      setShowAnswerModal(true);
    } else {
      //  정답 체크 후

      if (quizIndex === quizAmount - 1) {
        //  마지막 퀴즈일 경우 : 결과 페이지로 이동
        let correctCount = 0,
          incorrectCount = 0;
        quizResultList.forEach((item) => {
          if (item.isCorrect) correctCount++;
          else incorrectCount++;
        });

        const endTime = new Date().getTime();
        const solveTime = endTime - startTime;

        Router.push(
          {
            pathname: "/result",
            query: {
              amount: quizAmount,
              category: Number(router.query.category),
              difficulty: router.query.difficulty
                ? router.query.difficulty
                : "Any difficulty",
              solveTime: solveTime,
              correctCount: correctCount,
              incorrectCount: incorrectCount,
              categoryList: quizList.map((quiz) => quiz.category),
              typeList: quizList.map((quiz) => quiz.type),
              difficultyList: quizList.map((quiz) => quiz.difficulty),
              questionList: quizList.map((quiz) => quiz.question),
              correct_answerList: quizList.map((quiz) => quiz.correct_answer),
              incorrect_answersList_0: quizList.map(
                (quiz) => quiz.incorrect_answers[0]
              ),
              incorrect_answersList_1: quizList.map(
                (quiz) => quiz.incorrect_answers[1]
              ),
              incorrect_answersList_2: quizList.map(
                (quiz) => quiz.incorrect_answers[2]
              ),
            },
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

  return (
    <>
      {resCode === 0 ? (
        <Container>
          <QuizItem
            quiz={quizResultList[quizIndex]}
            index={quizIndex}
            onSelectChange={onSelectChange}
          />
          <Button onClick={onQuizClick}>{buttonLabel}</Button>
          {showCheckModal && (
            <Modal
              onClose={() => setShowCheckModal(false)}
              show={showCheckModal}
              title="Select Your Answer"
              message="Please Choice Your Answer"
            />
          )}
          {showAnswerModal && (
            <Modal
              onClose={() => setShowAnswerModal(false)}
              show={showAnswerModal}
              title="Check Answer Result"
              message={
                quizResultList[quizIndex].isCorrect
                  ? "Correct Answer"
                  : "Incorrect Answer"
              }
            />
          )}
        </Container>
      ) : (
        // TO-DO : resCode에 따른 에러 문구 출력
        <ErrorPage>
          <div className="error-header">{resCodeHeader(resCode)}</div>
          <div className="error-body">
            {resCodeBody(resCode)
              .split("\n")
              .map((str, index) => (
                <span key={index}>
                  {str}
                  <br />
                </span>
              ))}
          </div>
        </ErrorPage>
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

  if (context.query.categoryList === (null || undefined)) {
    //  index page에서 넘어오는 경우
    const res = await getQuiz(options);
    const resCode = res.data.response_code;
    const originData = res.data.results;

    //  정답과 오답을 섞은 출력용 리스트 할당
    const data = originData.map((quiz) => {
      return {
        ...quiz,
        answerList: [...quiz.incorrect_answers, quiz.correct_answer].sort(
          () => Math.random() - Math.random()
        ),
      };
    });

    return {
      props: {
        resCode,
        quizList: data,
      },
    };
  } else {
    //  result page에서 retry를 통해 넘어오는 경우
    const resCode = 0;
    let quizList: QuizData[] = [];

    for (let i = 0; i < options.amount; i++) {
      quizList.push({
        category: context.query.categoryList[i],
        type: context.query.typeList[i],
        difficulty: context.query.difficultyList[i] as Difficulty,
        question: context.query.questionList[i],
        correct_answer: context.query.correct_answerList[i],
        incorrect_answers: [
          context.query.incorrect_answersList_0[i],
          context.query.incorrect_answersList_1[i],
          context.query.incorrect_answersList_2[i],
        ],
        answerList: [
          context.query.correct_answerList[i],
          context.query.incorrect_answersList_0[i],
          context.query.incorrect_answersList_1[i],
          context.query.incorrect_answersList_2[i],
        ].sort(() => Math.random() - Math.random()),
      });
    }
    return {
      props: {
        resCode,
        quizList,
      },
    };
  }
}

export default Quiz;
