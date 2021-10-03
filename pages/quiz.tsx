import { useRouter } from "next/router";
import Header from "../components/layout/Header";
import MainLayout from "../components/layout/MainLayout";
import { styled } from "../stitches.config";

export default function Quiz() {
  const router = useRouter();

  const Container = styled("div", {
    gridArea: "main",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    paddingLeft: "30vw",
    paddingRight: "30vw",
    ":last-child": {
      gridColumnStart: 1,
      gridColumnEnd: 3,
    },
  });

  const results = router.query.results;

  return (
    <MainLayout>
      <Header />
      <div>{results}</div>
    </MainLayout>
  );
}
