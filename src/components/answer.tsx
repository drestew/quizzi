import React from "react";
import { answer } from "./types";

export default function Answer({
  id,
  answer,
  selectAnswer,
  selected,
  quizComplete,
}: answer) {
  const styles = selected
    ? {
        backgroundColor: "#314776",
        color: "rgb(255, 240, 171)",
      }
    : {
        backgroundColor: "rgba(255, 240, 171, 20%)",
        color: "#314776",
        border: "solid 1px #314776",
      };
  return (
    <button id={id} onClick={selectAnswer} style={styles}>
      {answer}
    </button>
  );
}
