import { styled } from "../stitches.config";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Select from "./ui/Select";

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

const Label = styled("span", {
  fontsize: "1.5em",
  textAlign: "center",
  display: "table-cell",
  verticalAlign: "middle",
});

const StartQuiz = () => (
  // TO-DO : input, select, button -> component화
  <Container>
    <Label>Quiz Amount</Label>
    <Input hint="input number" />
    <Label>Quiz Category</Label>
    <Select name="category">
      <option value="any">Any Category</option>
      <option value="9">General Knowledge</option>
      <option value="20">Mythology</option>
      <option value="21">Sports</option>
      <option value="22">Geography</option>
      <option value="23">History</option>
      <option value="24">Politics</option>
      <option value="25">Art</option>
      <option value="26">Celebrities</option>
      <option value="27">Animals</option>
      <option value="28">Vehicles</option>
      <optgroup label="Entertainment">
        <option value="10">Entertainment: Books</option>
        <option value="11">Entertainment: Film</option>
        <option value="12">Entertainment: Music</option>
        <option value="13">Entertainment: Musicals &amp; Theatres</option>
        <option value="14">Entertainment: Television</option>
        <option value="15">Entertainment: Video Games</option>
        <option value="16">Entertainment: Board Games</option>
        <option value="29">Entertainment: Comics</option>
        <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
        <option value="32">Entertainment: Cartoon &amp; Animations</option>
      </optgroup>
      <optgroup label="Science">
        <option value="17">Science &amp; Nature</option>
        <option value="18">Science: Computers</option>
        <option value="19">Science: Mathematics</option>
        <option value="30">Science: Gadgets</option>
      </optgroup>
    </Select>
    <Label>Quiz Difficulty</Label>
    <Select>
      <option value="any">Any Difficulty</option>
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </Select>
    <Button name="Start Quiz!" />
  </Container>
);

export default StartQuiz;
