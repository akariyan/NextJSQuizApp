// stitches.config.ts
import { createStitches } from "@stitches/react";

export const { styled, css, getCssText } = createStitches({
  media: {
    //  TO-DO : 임시 - 반응형 개발을 위한 타겟 디바이스 사이즈 정리
    mobile_m: "(min-width: 375px)",
    mobile_l: "(min-width: 425px)",
    tablet: "(min-width: 768px)",
    pc: "(min-width: 1024px)",
  },
  theme: {
    colors: {
      black: "#000000",
      white: "#FFFFFF",
      red: "#ff0000",
      yellow: "#ffff00",
      green: "#008000",
      greenYellow: "#ADFF2F",
      mint: "#BDFCC9",
      s_cyanblue: "#3498db",
    },
  },
});
