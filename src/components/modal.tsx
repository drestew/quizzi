import { modal } from "./types";

export default function Modal({ startQuiz }: modal) {
  return (
    <div className="modal">
      <h1 className="modal-header">Welcome To Quizzi!</h1>
      <p className="modal-description">
        Practice questions for your journey to becoming a networking expert
      </p>
      <button className="primary-btn" onClick={startQuiz}>
        Start Quiz
      </button>
    </div>
  );
}