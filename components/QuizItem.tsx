import { QuizData } from "../rest/types/apiType";
import { styled } from "../stitches.config";
import InputGroup from "./ui/InputGroup";

interface QuizItemProps {
  item: QuizData;
  index: number;
  callback?: (boolean) => void;
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

export default function QuizItem({ item, index }: QuizItemProps) {
  function checkAnswer() {
    // 정답 여부 체크 후 callback을 통해 부모에게 정답 여부 전달
  }

  const correctAnswer = item.correct_answer;
  const answers = [...item.incorrect_answers, correctAnswer];
  const shuffledAnswers = answers.sort(() => Math.random() - Math.random());

  const mapValue = shuffledAnswers.map((answer, idx) => (
    <div className="answer" key={idx}>
      <InputGroup.Radio type="radio" name="answer" value={answer} />
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
}