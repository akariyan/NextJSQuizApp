import React from "react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { styled } from "../stitches.config";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
