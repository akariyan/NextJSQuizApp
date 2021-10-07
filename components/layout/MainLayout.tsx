import Header from "./Header";
import { styled } from "../../stitches.config";

const StyledMainLayout = styled("div", {
  display: "grid",
  gridTemplateAreas: `
  "header"
  "main"
  `,
  gridTemplateRows: "120px 1fr",
  height: "100vh",
  margin: 0,
  padding: 0,
  fontSize: "16px",
});

const MainLayout = (props) => (
  <StyledMainLayout>{props.children}</StyledMainLayout>
);

export default MainLayout;
