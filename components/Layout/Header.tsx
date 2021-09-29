import Link from "next/link";

/**
 * TO-DO : 임시 Header. 테스트용 이동 기능 상태 -> 추후 다른 용도로 변경 or 제거
 */

//  TO-DO : 테스트용 CSS -> 추후 제거 예정
const linkStyle = {
  marginRight: 15,
};

const Header = () => (
  <div>
    <p>임시 Header</p>
    <Link href="/">
      <a style={linkStyle}>시작 페이지</a>
    </Link>
    <Link href="/quiz">
      <a style={linkStyle}>퀴즈 페이지</a>
    </Link>
    <Link href="/result">
      <a style={linkStyle}>결과 페이지</a>
    </Link>
  </div>
);

export default Header;
