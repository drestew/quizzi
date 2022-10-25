import React from "react";
import { useState, useEffect } from "react";
import { QuestionAnswer } from "./components/question";
import { question } from "./components/types";
import { nanoid } from "nanoid";
import { shuffle } from "lodash";

function App() {
  const [questions, setQuestions] = useState<question[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [quizComplete, setQuizComplete] = useState(false);

  useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=10&category=17&difficulty=medium&type=multiple"
    )
      .then((resp) => resp.json())
      .then((data: any) =>
        setQuestions(() =>
          data.results.map((question: question) => {
            const correctAnswerId = nanoid();
            return {
              ...question,
              id: nanoid(),
              correct_answer: {
                text: question.correct_answer,
                id: correctAnswerId,
              },
              answerCorrect: false,
              answers: shuffle(
                [question.correct_answer, ...question.incorrect_answers].map(
                  (answer, index) => {
                    return {
                      text: answer,
                      result: index === 0 ? "correct" : "incorrect",
                      selected: false,
                      id: index === 0 ? correctAnswerId : nanoid(),
                    };
                  }
                )
              ),
            };
          })
        )
      );
  }, []);

  function selectAnswer(questionId: string, answerId: string): void {
    return setQuestions((questions) =>
      questions.map((question) => {
        if (question.id === questionId) {
          const newAnswers = question.answers.map((answer) => {
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
      />
    );
  });

  return (
    <div className="App">
      <div className="questions-container">{questionList}</div>
      {quizComplete && (
        <p className="quiz-score">Your score is {correctAnswers}/10</p>
      )}
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
