import React from "react";
import { question } from "./types";
import Answer from "./answer";

export function QuestionAnswer(
  { question, correct_answer, incorrect_answers, selectAnswer, id }: question,
  quizComplete: boolean
) {
  const randomIndex = Math.ceil(Math.random() * 3);
  // TODO create function for randomizing the order of the answer array
  // const answerArrMutable = incorrect_answers // to avoid mutating the incoming prop
  // answerArrMutable.splice(randomIndex,0, correct_answer)
  //TODO add all answers to sepearate array so the incoming prop (incorrect_answers) won't be mutated
  //TODO create a subarray of the answers: [answer, incorrect/correct]
  //TODO add a random number to be associated with each answer and then sort

  // const answers = answerArrMutable.map(answer => {
  //     return <button className="question" key={nanoid()} onClick={selectAnswer}>{answer}</button>
  // })
  const answers = [correct_answer, ...incorrect_answers].map((answer) => {
    return (
      <Answer
        key={answer.text}
        answer={answer.text}
        id={answer.id}
        selectAnswer={() => selectAnswer(id, answer.id)}
        selected={answer.selected}
        quizComplete={quizComplete}
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
