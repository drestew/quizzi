import { question } from "./types";
import Answer from "./answer";
import { nanoid } from "nanoid";
import React from "react";

export function QuestionAnswer({
  question,
  selectAnswer,
  id,
  quizComplete,
  answers,
  correct_answer,
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
        correctAnswer={answer.id === correct_answer || false}
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
