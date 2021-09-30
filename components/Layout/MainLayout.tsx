import Header from "./Header";
import { styled } from "../../stitches.config";

//  TO-DO : 테스트용 CSS -> 추후 제거 예정
const StyledMainLayout = styled("div", {
  margin: 20,
  padding: 20,
});

const MainLayout = (props) => (
  <StyledMainLayout>
    <Header />
    {props.children}
  </StyledMainLayout>
);

export default MainLayout;
