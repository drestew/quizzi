import { useState } from "react";
import QuestionList from "./components/questionList";
import Modal from "./components/modal";

export default function App() {
  const [quizStart, setQuizStart] = useState(false);

  const startQuiz = function () {
    setQuizStart(true);
  };

  return (
    <div className="App">
      {quizStart ? <QuestionList /> : <Modal startQuiz={startQuiz} />}
    </div>
  );
}
