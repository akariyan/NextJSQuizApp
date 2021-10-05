import { styled } from "../stitches.config";

export default function Result() {
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

  return <Container>result page</Container>;
}
