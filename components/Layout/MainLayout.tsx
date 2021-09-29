import Header from "./Header";

//  TO-DO : 테스트용 CSS -> 추후 제거 예정
const layoutStyle = {
  margin: 20,
  padding: 20,
  border: "1px solid #DDD",
};

const MainLayout = (props) => (
  <div style={layoutStyle}>
    <Header />
    {props.children}
  </div>
);

export default MainLayout;
