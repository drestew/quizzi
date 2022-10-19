import { useState, useEffect } from "react";
import "./App.css";
import { QuestionAnswer, questionInterface } from "./components/question";
import { nanoid } from "nanoid";

function App() {
  const [questions, setQuestions] = useState<questionInterface[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<questionInterface[]>([]);

  useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=10&category=17&difficulty=medium&type=multiple"
    )
      .then((resp) => resp.json())
      .then((data) =>
        setQuestions(() =>
          data.results.map((question: questionInterface) => {
            return {
              ...question,
              id: nanoid(),
              correct_answer: {
                text: question.correct_answer,
                result: "correct", // this is to specify which answer is which once the correct answer and
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
  }, []);
  console.log(questions);

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
              ? { ...answer, selected: !answer.selected }
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

  function checkAnswer(questionId: string, answerId: string): void {}
  // TODO highlight answer when selected -- DONE
  // TODO add property for question object that states whether the selected answer was correct -- DONE
  // TODO styling

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
      />
    );
  });

  return (
    <div className="App">
      {questionList}
      <div>
        <button className="results-btn">Submit Answers</button>
      </div>
    </div>
  );
}

export default App;
