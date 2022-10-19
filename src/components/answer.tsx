import { answerInterface } from "./question";

export default function Answer({
  id,
  answer,
  selectAnswer,
  selected,
}: answerInterface) {
  const styles = {
    backgroundColor: selected ? "blue" : "white",
  };
  return (
    <button id={id} onClick={selectAnswer} style={styles}>
      {answer}
    </button>
  );
}
