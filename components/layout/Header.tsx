import { styled } from "../../stitches.config";
import Link from "next/link";

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
    <Link href="/" passHref>
      <StyledTitleP>Next-QuizApp</StyledTitleP>
    </Link>
  </StyledHeader>
);

export default Header;
