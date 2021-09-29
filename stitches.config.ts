// stitches.config.ts
import { createStitches } from "@stitches/react";

export const { styled, css } = createStitches({
  media: {
    //  TO-DO : 임시 - 반응형 개발을 위한 타겟 디바이스 사이즈 정리
    mobile: "(min-width: 600px)",
    pcweb: "(min-width: 1280px)",
  },
});
