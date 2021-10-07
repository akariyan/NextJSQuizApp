import { globalCss } from "@stitches/react";
import { AppProps } from "next/app";
import Header from "../components/layout/Header";
import MainLayout from "../components/layout/MainLayout";

//  여기에 전역 스타일 정의
const GlobalStyles = globalCss({
  "*": { boxSizing: "border-box" },
  body: { margin: 0, paddring: 0 },
});

function App({ Component, pageProps }: AppProps) {
  GlobalStyles();
  return (
    <MainLayout>
      <Header />
      <Component {...pageProps} />
    </MainLayout>
  );
}

export default App;
