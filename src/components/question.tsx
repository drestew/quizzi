import React, {useState, useMemo} from "react";
import {question} from "./types";
import Answer from "./answer";
import {nanoid} from "nanoid";

const randomizeOrder = function (answers: any) {
  const randomIndex = Math.ceil(Math.random() * 3);
  const correct_answer = answers.shift();
  answers.splice(randomIndex, 0, correct_answer);
  return answers;
};

export function QuestionAnswer({
                                 question,
                                 correct_answer,
                                 incorrect_answers,
                                 selectAnswer,
                                 id,
                                 quizComplete,
                                 answerOrder,
                               }: question) {

  const answers = answerOrder.map((answer: any) => {
    return (
        <Answer
            key={nanoid()}
            text={answer.text}
            id={answer.id}
            selectAnswer={() => selectAnswer(id, answer.id)}
            selected={answer.selected}
            quizComplete={quizComplete}
            correctAnswer={answer.id === correct_answer.id || false}
        />
    );
  });

  return (
      <div className="question-container">
        <h2>{question}</h2>
        <div className="answer-container">{answers}</div>
      </div>
  );
}
