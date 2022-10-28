import { answer } from "./types";

export default function Answer({
  id,
  text,
  selectAnswer,
  selected,
  quizComplete,
  answers,
}: answer) {

  const correctAnswerIds = answers.filter(answer => answer.result === 'correct').map(answer => answer.id)

  const styleSelectedAnswer = selected
    ? {
        backgroundColor: "#314776",
        color: "rgb(255, 240, 171)",
      }
    : {
        backgroundColor: "#fff9e0",
        color: "#314776",
        border: "solid 1px #314776",
      };
      
  const styleCompletedQuiz = function () {
    let styles;
    if (correctAnswerIds.includes(id) && selected) {
      styles = { backgroundColor: "#6C8319", color: "rgb(255, 240, 171)" };
    } else if (!correctAnswerIds.includes(id) && selected) {
      styles = {
        backgroundColor: "#75163D",
        color: "rgb(255, 240, 171)",
        opacity: "50%",
      };
    } else if (correctAnswerIds.includes(id) && !selected) {
      styles = {
        backgroundColor: "#6C8319",
        color: "rgb(255, 240, 171)",
        opacity: "50%",
      };
    } else {
      styles = styleSelectedAnswer;
    }
    return styles;
  };

  const answerStyle = quizComplete ? styleCompletedQuiz() : styleSelectedAnswer;

  return (
    <button
      id={id}
      onClick={selectAnswer}
      style={answerStyle}
      className="answer-btn"
    >
      {text}
    </button>
  );
}
