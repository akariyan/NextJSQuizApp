import Link from "next/link";
import { styled } from "../../stitches.config";

/**
 * TO-DO : 임시 Header. 테스트용 이동 기능 상태 -> 추후 다른 용도로 변경 or 제거
 */

//  TO-DO : Stitches 테스트용 CSS -> 추후 제거 예정
const StyledAnchor = styled("a", {
  marginRight: 15,
  fontSize: 20,
  "@mobile_m": {
    color: "$green",
  },
  "@mobile_l": {
    color: "$red",
  },
  "@tablet": {
    color: "$yellow",
  },
  "@pc": {
    color: "$black",
  },
});

const Header = () => (
  <div>
    <p>임시 Header</p>
    <Link href="/" passHref>
      <StyledAnchor>시작 페이지</StyledAnchor>
    </Link>
    <Link href="/quiz" passHref>
      <StyledAnchor>퀴즈 페이지</StyledAnchor>
    </Link>
    <Link href="/result" passHref>
      <StyledAnchor>결과 페이지</StyledAnchor>
    </Link>
  </div>
);

export default Header;
