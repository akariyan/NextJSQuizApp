import { styled } from "../stitches.config";
import Link from "next/link";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Select from "./ui/Select";
import { QUIZ_CATEGORYS, QUIZ_DIFFICULTY } from "../Constants";
import { Difficulty, QuizOption } from "../api/types/apiType";
import { useCallback, useState } from "react";
import Router from "next/router";
import { getQuiz } from "../api/quizAPI";

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

const LabelCell = styled("div", {
  textAlign: "right",
  padding: "2px",
  margin: "20% 10% 20% 10%",
  border: "3px solid",
});

const FunctionCell = styled("div", {
  textAlign: "center",
  padding: "2px",
  margin: "20% 10% 20% 10%",
  border: "3px solid",
});

const Label = styled("span", {
  fontsize: "1.5em",
  textAlign: "center",
  display: "inline-block",
  verticalAlign: "middle",
});

function StartQuiz() {
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
        //  TO-DO : 퀴즈 데이터를 query로 넘길꺼면 더 적합한 형태로 다듬어야함
        //  query 말고 전역 상태로 업데이트하고 quiz 페이지에서 상태를 참조하는 방식이 될지 조사
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
      <LabelCell>
        <Label>Quiz Amount</Label>
      </LabelCell>
      <FunctionCell>
        <Input hint="input number" onChange={onInputChange} />
      </FunctionCell>
      <LabelCell>
        <Label>Quiz Category</Label>
      </LabelCell>
      <FunctionCell>
        <Select
          name="category"
          options={QUIZ_CATEGORYS}
          onChange={onSelectChange}
        />
      </FunctionCell>
      <LabelCell>
        <Label>Quiz Difficulty</Label>
      </LabelCell>
      <FunctionCell>
        <Select
          name="difficulty"
          options={QUIZ_DIFFICULTY}
          onChange={onSelectChange}
        />
      </FunctionCell>
      <Button name="Start Quiz!" onClick={goQuiz} />
    </Container>
  );
}

export default StartQuiz;
