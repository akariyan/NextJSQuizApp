import { AppProps } from "next/app";
import Header from "../components/layout/Header";
import MainLayout from "../components/layout/MainLayout";

function App({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Header />
      <Component {...pageProps} />;
    </MainLayout>
  );
}

export default App;
