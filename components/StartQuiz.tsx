import { styled } from "../stitches.config";
import Link from "next/link";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Select from "./ui/Select";
import { QUIZ_CATEGORYS, QUIZ_DIFFICULTY } from "../Constants";
import { QuizOption } from "../api/types/apiType";
import { useState } from "react";

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

  const onInputChange = (e) => {
    setAmount(e.target.value);
    console.log(amount);
  };

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
        <Select name="category" options={QUIZ_CATEGORYS} />
      </FunctionCell>
      <LabelCell>
        <Label>Quiz Difficulty</Label>
      </LabelCell>
      <FunctionCell>
        <Select name="difficulty" options={QUIZ_DIFFICULTY} />
      </FunctionCell>
      <Link
        href={{
          pathname: "/quiz",
          query: {
            amount: amount,
          },
        }}
        passHref
      >
        <Button name="Start Quiz!" />
      </Link>
    </Container>
  );
}

export default StartQuiz;
