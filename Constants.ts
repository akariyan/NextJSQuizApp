import { ISelectBoxOption } from "./types/selectBoxOption";

export const QUIZ_CATEGORYS: ISelectBoxOption[] = [
  { id: 1, value: "9", text: "General Knowledge" },
  { id: 2, value: "20", text: "Mythology" },
  { id: 3, value: "21", text: "Sports" },
  { id: 4, value: "22", text: "Geography" },
  { id: 5, value: "23", text: "History" },
  { id: 6, value: "24", text: "Politics" },
  { id: 7, value: "25", text: "Art" },
  { id: 8, value: "26", text: "Celebrities" },
  { id: 9, value: "27", text: "Animals" },
  { id: 10, value: "28", text: "Vehicles" },
  {
    id: 11111,
    group: "Entertainment",
    children: [
      { id: 11, value: "10", text: "Books" },
      { id: 12, value: "11", text: "Film" },
      { id: 13, value: "12", text: "Music" },
      { id: 14, value: "13", text: "Musicals & Theatres" },
      { id: 15, value: "14", text: "Television" },
      { id: 16, value: "15", text: "Video Games" },
      { id: 17, value: "16", text: "Board Games" },
      { id: 18, value: "29", text: "Comics" },
      { id: 19, value: "31", text: "Japanese Anime & Manga" },
      { id: 20, value: "32", text: "Cartoon & Animations" },
    ],
  },
  {
    id: 22222,
    group: "Science",
    children: [
      { id: 21, value: "17", text: "Nature" },
      { id: 22, value: "18", text: "Computers" },
      { id: 23, value: "19", text: "Mathematics" },
      { id: 24, value: "30", text: "Gadgets" },
    ],
  },
];

export const QUIZ_DIFFICULTY: ISelectBoxOption[] = [
  { id: 101, value: "any", text: "Any Difficulty" },
  { id: 102, value: "easy", text: "Easy" },
  { id: 103, value: "medium", text: "Medium" },
  { id: 104, value: "hard", text: "Hard" },
];
