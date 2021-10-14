import { useMemo } from "react";
import { useRouter } from "next/router";
import Button from "../components/ui/Button";
import InputGroup from "../components/ui/InputGroup";
import Select from "../components/ui/Select";
import { styled } from "../stitches.config";

const Container = styled("div", {
  gridArea: "main",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gridTemplateRows: "0.5fr*6 1fr 1fr",
  paddingLeft: "30vw",
  paddingRight: "30vw",
  fontSize: "1.5em",
  button: {
    gridColumnStart: 1,
    gridColumnEnd: 3,
  },
  ".label-cell": {
    textAlign: "right",
    paddingLeft: "1vw",
    margin: "0",
    display: "flex",
    alignItems: "center",
  },
  ".function-cell": {
    textAlign: "right",
    paddingLeft: "1vw",
    margin: "0",
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
  },
  ".label": {
    fontsize: "1.5em",
    textAlign: "center",
    display: "inline-block",
    verticalAlign: "middle",
  },
  ".retry-button": {
    backgroundColor: "$red",
  },
  ".otherquiz-button": {},
});

const convertCategory = (category: number) => {
  switch (category) {
    case 9:
      return "General Knowledge";
    case 10:
      return "Entertainment: Books";
    case 11:
      return "Entertainment: Film";
    case 12:
      return "Entertainment: Music";
    case 13:
      return "Entertainment: Musicals & Theatres";
    case 14:
      return "Entertainment: Television";
    case 15:
      return "Entertainment: Video Games";
    case 16:
      return "Entertainment: Board Games";
    case 17:
      return "Science & Nature";
    case 18:
      return "Science: Computers";
    case 19:
      return "Science: Mathematics";
    case 20:
      return "Mythology";
    case 21:
      return "Sports";
    case 22:
      return "Geography";
    case 23:
      return "History";
    case 24:
      return "Politics";
    case 25:
      return "Art";
    case 26:
      return "Celebrities";
    case 27:
      return "Animals";
    case 28:
      return "Vehicles";
    case 29:
      return "Entertainment: Comics";
    case 30:
      return "Science: Gadgets";
    case 31:
      return "Entertainment: Japanese Anime & Manga";
    case 32:
      return "Entertainment: Cartoon & Animations";
    default:
      return "Any Category";
  }
};

function Result() {
  const router = useRouter();
  const memoCategory = useMemo(
    () => convertCategory(Number(router.query.category)),
    [router.query.category]
  ); // computed value

  const solveTimeMin = useMemo(
    () => Math.floor(Number(router.query.solveTime) / 60000),
    [router.query.solveTime]
  );

  const solveTimeSec = useMemo(
    () => Math.floor((Number(router.query.solveTime) % 60000) / 1000),
    [router.query.solveTime]
  );

  return (
    <Container>
      <div className="label-cell">
        <span className="label">Quiz Amount</span>
      </div>
      <div className="function-cell">
        <span className="label">{router.query.amount}</span>
      </div>
      <div className="label-cell">
        <span className="label">Quiz Category</span>
      </div>
      <div className="function-cell">
        <span className="label">{memoCategory}</span>
      </div>
      <div className="label-cell">
        <span className="label">Quiz Difficulty</span>
      </div>
      <div className="function-cell">
        <span className="label">{router.query.difficulty}</span>
      </div>
      <div className="label-cell">
        <span className="label">Time to Solve</span>
      </div>
      <div className="function-cell">
        <span className="label">
          {solveTimeMin} Min {solveTimeSec} Sec
        </span>
      </div>
      <div className="label-cell">
        <span className="label">Correct Answer</span>
      </div>
      <div className="function-cell">
        <span className="label">{router.query.correctCount}</span>
      </div>
      <div className="label-cell">
        <span className="label">Incorrect Answer</span>
      </div>
      <div className="function-cell">
        <span className="label">{router.query.incorrectCount}</span>
      </div>
      <Button
        className="retry-button"
        onClick={() => {
          router.push(
            {
              pathname: "/quiz",
              query: {
                amount: Number(router.query.amount),
                category:
                  Number(router.query.category) === 0
                    ? undefined
                    : Number(router.query.category),
                difficulty:
                  router.query.difficulty === "Any difficulty"
                    ? undefined
                    : router.query.difficulty,
                categoryList: router.query.categoryList,
                typeList: router.query.typeList,
                difficultyList: router.query.difficultyList,
                questionList: router.query.questionList,
                correct_answerList: router.query.correct_answerList,
                incorrect_answersList_0: router.query.incorrect_answersList_0,
                incorrect_answersList_1: router.query.incorrect_answersList_1,
                incorrect_answersList_2: router.query.incorrect_answersList_2,
              },
            },
            "/quiz"
          );
        }}
      >
        Retry
      </Button>
      <Button className="otherquiz-button" onClick={() => router.push("/")}>
        Other Quiz
      </Button>
    </Container>
  );
}

export default Result;
