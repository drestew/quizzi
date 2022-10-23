import React from "react";
import { useState, useEffect, useMemo } from "react";
import "./App.css";
import { QuestionAnswer } from "./components/question";
import { question } from "./components/types";
import { nanoid } from "nanoid";
import { shuffle } from "lodash";

function App() {
  const [questions, setQuestions] = useState<question[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [initialRender, setIntitialRender] = useState(0);

  useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=10&category=17&difficulty=medium&type=multiple"
    )
      .then((resp) => resp.json())
      .then((data: any) =>
        setQuestions(() =>
          data.results.map((question: question) => {
            return {
              ...question,
              id: nanoid(),
              correct_answer: {
                text: question.correct_answer,
                result: "correct", // this is to specify which text is which once the correct text and
                // incorrect answers are combined into a single array
                selected: false,
                id: nanoid(),
              },
              incorrect_answers: question.incorrect_answers.map((answer) => {
                return {
                  text: answer,
                  result: "incorrect",
                  selected: false,
                  id: nanoid(),
                };
              }),
              answerCorrect: false,
            };
          })
        )
      );
    setIntitialRender((initialRender) => initialRender + 1);
  }, []);

  function selectAnswer(questionId: string, answerId: string): void {
    return setQuestions((questions) =>
      questions.map((question) => {
        if (question.id === questionId) {
          const answers = [
            question.correct_answer,
            ...question.incorrect_answers,
          ];
          const newAnswers = answers.map((answer) => {
            return answer.id === answerId
              ? { ...answer, selected: true }
              : { ...answer, selected: false };
          });
          return {
            ...question,
            correct_answer: newAnswers[0],
            incorrect_answers: newAnswers.slice(1),
            answerCorrect:
              question.correct_answer.id === answerId
                ? !question.answerCorrect
                : question.answerCorrect,
          };
        } else {
          return question;
        }
      })
    );
  }

  function checkAnswers() {
    const numCorrect = questions
      .map((question) => question)
      .filter((question) => question.answerCorrect);
    console.log(numCorrect);
    setCorrectAnswers(numCorrect.length);
    setQuizComplete(true);
  }

  function restartQuiz() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setCorrectAnswers(0);
    setQuizComplete(false);
    return setQuestions((questions) =>
      questions.map((question) => {
        const answers = [
          question.correct_answer,
          ...question.incorrect_answers,
        ];
        const selectedToFalse = answers.map((answer) => {
          return { ...answer, selected: false };
        });
        return {
          ...question,
          answerCorrect: false,
          correct_answer: selectedToFalse[0],
          incorrect_answers: selectedToFalse.slice(1),
        };
      })
    );
  }

  const questionList = questions.map((question) => {
    const answerOrder =
      initialRender === 0
        ? shuffle([question.correct_answer, ...question.incorrect_answers])
        : [question.correct_answer, ...question.incorrect_answers];
    // const answerOrder = shuffle([question.correct_answer, ...question.incorrect_answers])
    console.log(initialRender);
    return (
      <QuestionAnswer
        key={question.id}
        question={question.question}
        correct_answer={question.correct_answer}
        incorrect_answers={question.incorrect_answers}
        id={question.id}
        selectAnswer={selectAnswer}
        answerCorrect={question.answerCorrect}
        quizComplete={quizComplete}
        answerOrder={answerOrder}
      />
    );
  });

  return (
    <div className="App">
      <div className="questions-container">{questionList}</div>
      {quizComplete && <p>Your score is {correctAnswers}/10</p>}
      <div>
        {questions.length > 0 && (
          <button
            className="results-btn"
            onClick={quizComplete ? () => restartQuiz() : () => checkAnswers()}
          >
            {quizComplete ? "Restart Quiz" : "Check Answers"}
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
