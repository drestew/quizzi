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
      {/* <div className="triangles-container"> */}
      <div className="triangle-top">
        <div className="triangle-gradient-top"></div>
      </div>
      <div className="triangle-btm">
        <div className="triangle-gradient-btm"></div>
      </div>
      {/* </div> */}
      {quizStart ? <QuestionList /> : <Modal startQuiz={startQuiz} />}
    </div>
  );
}
