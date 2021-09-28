import useSWR from "swr";

export default function PracSWR() {
  const { data, error } = useSWR(
    "https://opentdb.com/api.php?amount=10&type=multiple",
    (url) => {
      return fetch(url).then((res) => res.json());
    }
  );

  if (error) {
    return <div>fail</div>;
  }
  if (!data) {
    return <div>loading</div>;
  }
  return <div>{data.results[0].question}</div>;
}
