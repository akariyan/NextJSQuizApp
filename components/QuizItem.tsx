import {
  ChangeEvent,
  createRef,
  forwardRef,
  Ref,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { QuizData } from "../rest/types/apiType";
import { styled } from "../stitches.config";
import InputGroup from "./ui/InputGroup";

interface QuizItemProps {
  item: QuizData;
  index: number;
}

const StyledQuizItem = styled("div", {
  display: "grid",
  gridColumnStart: "1",
  gridColumnEnd: "3",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "1fr 0.5fr 1fr",
  gridTemplateAreas: `
  "question"
  "tag"
  "awnserlist"
  `,
  fontSize: "1.5em",
  ".question": {
    gridArea: "question",
    paddingTop: "2vh",
    lineHeight: "2em",
  },
  ".tag": {
    gridArea: "tag",
    span: {
      backgroundColor: "$greenCyan",
      borderRadius: "2.5vh",
      display: "inline-block",
      height: "5vh",
      margin: "2vw 2vh",
      padding: "0.5em 1em",
      paddingTop: "0.5em",
      textAlign: "center",
      fontSize: "0.7em",
      color: "$white",
    },
    ".category": {},
  },
  ".awnserlist": {
    gridArea: "awnserlist",
    display: "flex",
    flexDirection: "column",
    input: {
      width: "2em",
    },
  },
});

export interface QuizItemRef {
  checkAnswer: () => boolean;
}

const QuizItem = ({ item, index }: QuizItemProps, ref: Ref<QuizItemRef>) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const correctAnswer = item.correct_answer;
  const answers = [...item.incorrect_answers, correctAnswer];
  const shuffledAnswers = useMemo(
    () => answers.sort(() => Math.random() - Math.random()),
    [correctAnswer]
  ); //  선택된 값 변경으로 인한 rendering시 shuffle 발생을 방지

  useImperativeHandle(ref, () => ({ checkAnswer })); //  checkAnswer 함수를 부모에서 접근하기 위해 Ref 사용

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(e.target.value);
  };

  function checkAnswer() {
    if (selectedAnswer == correctAnswer) {
      return true;
    } else {
      return false;
    }
  }

  const mapValue = shuffledAnswers.map((answer, idx) => (
    //  TO-DO : 다음 퀴즈에서도 체크 상태 유지되는 문제 해결
    <div className="answer" key={idx}>
      <InputGroup.Radio
        type="radio"
        name="answer"
        value={answer}
        onChange={onChange}
      />
      <span dangerouslySetInnerHTML={{ __html: answer }} />
    </div>
  ));

  return (
    <StyledQuizItem>
      <div
        className="question"
        dangerouslySetInnerHTML={{ __html: `Q${index + 1} : ${item.question}` }}
      />
      <div className="tag">
        <span className="difficulty">{item.difficulty}</span>
        <span className="category">{item.category}</span>
      </div>
      <div className="awnserlist">{mapValue}</div>
    </StyledQuizItem>
  );
};

export default forwardRef(QuizItem);
