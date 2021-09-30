import { styled } from "../../stitches.config";

const StyledHeader = styled("div", {
  backgroundColor: "$s_cyanblue",
  gridArea: "header",
  display: "grid",
});

const StyledTitleP = styled("p", {
  textAlign: "center",
  fontSize: "2em",
  color: "$white",
});

const Header = () => (
  <StyledHeader>
    <StyledTitleP>Next-QuizApp</StyledTitleP>
  </StyledHeader>
);

export default Header;
