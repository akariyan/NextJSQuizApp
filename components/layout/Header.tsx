import { styled } from "../../stitches.config";
import Link from "next/link";

const StyledHeader = styled("div", {
  backgroundColor: "$greenCyan",
  gridArea: "header",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const StyledTitleP = styled("p", {
  fontSize: "2.5em",
  color: "$white",
  cursor: "pointer",
});

const Header = () => (
  <StyledHeader>
    <Link href="/" passHref>
      <StyledTitleP>Next-QuizApp</StyledTitleP>
    </Link>
  </StyledHeader>
);

export default Header;
