import { AppProps } from "next/app";
import { styled } from "@stitches/react";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
