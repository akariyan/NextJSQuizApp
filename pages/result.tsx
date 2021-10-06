import { styled } from "../stitches.config";

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
export default function Result() {
  return <Container>result page</Container>;
}
