import { question } from "./types";
import Answer from "./answer";
import { nanoid } from "nanoid";

export function QuestionAnswer({
  question,
  selectAnswer,
  id,
  quizComplete,
  answers,
}: question) {

  const answerList = answers.map((answer: any) => {
    return (
      <Answer
        key={nanoid()}
        text={answer.text}
        id={answer.id}
        selectAnswer={() => selectAnswer(id, answer.id)}
        selected={answer.selected}
        quizComplete={quizComplete}
        answers={answers}
      />
    );
  });

  return (
    <div className="question-container">
      <h2>{question}</h2>
      <div className="answer-container">{answerList}</div>
    </div>
  );
}
