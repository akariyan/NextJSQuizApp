import { styled } from "../stitches.config";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import { QUIZ_CATEGORYS, QUIZ_DIFFICULTY } from "../Constants";
import { Difficulty, QuizOption } from "../rest/types/apiType";
import { useCallback, useState } from "react";
import Router from "next/router";
import { getQuiz } from "../rest/quizAPI";

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
  ".label-cell": {
    textAlign: "right",
    padding: "2px",
    margin: "20% 10% 20% 10%",
    border: "3px solid",
  },
  "function-cell": {
    textAlign: "center",
    padding: "2px",
    margin: "20% 10% 20% 10%",
    border: "3px solid",
  },
  ".label": {
    fontsize: "1.5em",
    textAlign: "center",
    display: "inline-block",
    verticalAlign: "middle",
  },
});

export default function Home() {
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState(0);
  const [difficulty, setDifficulty] = useState("");

  const onInputChange = useCallback(
    (e) => {
      setAmount(e.target.value);
    },
    [setAmount]
  );

  const onSelectChange = useCallback((e) => {
    switch (e.target.name) {
      case "category":
        setCategory(e.target.value);
        break;
      case "difficulty":
        setDifficulty(e.target.value);
        break;
    }
  }, []);

  async function goQuiz() {
    console.log("go!");
    const options: QuizOption = {
      amount: Number(amount),
      category: category ? category : undefined,
      difficulty: difficulty ? (difficulty as Difficulty) : undefined,
    };
    const result = await getQuiz(options);
    console.log(result);
    Router.push(
      {
        //  TO-DO : quizdata를 query에 넣을수 있게 구조화
        pathname: "/quiz",
        query: {
          results: JSON.stringify(result.data.results),
        },
      },
      "/quiz"
    );
  }

  return (
    <Container>
      <div className="label-cell">
        <span className="label">Quiz Amount</span>
      </div>
      <div className="function-cell">
        <Input hint="input number" onChange={onInputChange} />
      </div>
      <div className="label-cell">
        <span className="label">Quiz Category</span>
      </div>
      <div className="function-cell">
        <Select
          name="category"
          options={QUIZ_CATEGORYS}
          onChange={onSelectChange}
        />
      </div>
      <div className="label-cell">
        <span className="label">Quiz Difficulty</span>
      </div>
      <div className="function-cell">
        <Select
          name="difficulty"
          options={QUIZ_DIFFICULTY}
          onChange={onSelectChange}
        />
      </div>
      <Button name="Start Quiz!" onClick={goQuiz} />
    </Container>
  );
}
