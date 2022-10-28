import React, { useState, useEffect } from "react";
import { QuestionAnswer } from "./question";
import { question } from "./types";
import { nanoid } from "nanoid";
import { shuffle } from "lodash";
import { data } from "../data";
import LineSeparator from "./lineSeparator";

export default function QuestionList() {
  const [questions, setQuestions] = useState<question[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const dataQuestions = new Promise((resolve) => resolve(data));
  useEffect(() => {
    dataQuestions.then((dataQuestions: any) =>
      setQuestions(() => {
        return dataQuestions.map((question: question) => {
          return {
            ...question,
            id: nanoid(),
            correct_answer: question.correct_answer.map((answer) => {
              return {
                text: answer,
                id: nanoid(),
              };
            }),
            answerCorrect: false,
            answers: shuffle(
              [...question.correct_answer, ...question.incorrect_answers].map(
                (answer) => {
                  return {
                    text: answer,
                    result: question.correct_answer.includes(answer)
                      ? "correct"
                      : "incorrect",
                    selected: false,
                    id: nanoid(),
                  };
                }
              )
            ),
          };
        });
      })
    );
  }, []);

  function selectAnswer(questionId: string, answerId: string): void {
    const selectedQuestion = questions.filter(
      (question) => question.id === questionId
    );

    const selectedAnswer = selectedQuestion[0].answers.filter((answer) => {
      return answer.id === answerId && { ...answer, selected: true };
    });

    return setQuestions((questions) =>
      questions.map((question) => {
        if (question.id === questionId) {
          let newAnswers;
          if (question.type === "multiple") {
            newAnswers = question.answers.map((answer) => {
              return answer.id === selectedAnswer[0].id
                ? {
                    ...answer,
                    selected: !answer.selected,
                  }
                : { ...answer };
            });
            return {
              ...question,
              answers: newAnswers,
              answerCorrect: newAnswers.every(
                (answer) =>
                  (answer.result === "correct" && answer.selected) ||
                  (answer.result === "incorrect" && !answer.selected)
              ),
            };
          } else {
            newAnswers = question.answers.map((answer) => {
              return answer.id === answerId
                ? { ...answer, selected: true }
                : { ...answer, selected: false };
            });
            return {
              ...question,
              answers: newAnswers,
              answerCorrect: newAnswers.some(
                (answer) => answer.result === "correct" && answer.selected
              ),
            };
          }
        } else {
          return question;
        }
      })
    );
  }

  function checkAnswers() {
    const numCorrect = questions.filter((question) => question.answerCorrect);
    setCorrectAnswers(numCorrect.length);
    setQuizComplete(true);
  }

  function restartQuiz() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setCorrectAnswers(0);
    setQuizComplete(false);
    return setQuestions((questions) =>
      questions.map((question) => {
        const selectedToFalse = question.answers.map((answer) => {
          return { ...answer, selected: false };
        });
        return {
          ...question,
          answerCorrect: false,
          answers: selectedToFalse,
        };
      })
    );
  }

  const questionList = questions.map((question) => {
    return (
      <>
        <QuestionAnswer
          key={question.id}
          question={question.question}
          correct_answer={question.correct_answer}
          incorrect_answers={question.incorrect_answers}
          id={question.id}
          selectAnswer={selectAnswer}
          answerCorrect={question.answerCorrect}
          quizComplete={quizComplete}
          answers={question.answers}
          type={question.type}
        />
        <LineSeparator key={nanoid()}/>
      </>
    );
  });

  return (
    <div className="question-list">
      <div className="questions-container">{questionList}</div>
      {quizComplete && (
        <p className="quiz-score">{correctAnswers === 9 ? `Perfect score! 9/9` : `Your score is ${correctAnswers}/9`}</p>
      )}
      <div>
        {questions.length > 0 && (
          <button
            className="primary-btn"
            onClick={quizComplete ? () => restartQuiz() : () => checkAnswers()}
          >
            {quizComplete ? "Restart Quiz" : "Check Answers"}
          </button>
        )}
      </div>
    </div>
  );
}
