import Answer from "./answer";

export interface questionInterface {
  category?: string;
  correct_answer: {
    text: string;
    result: string;
    selected: boolean;
    id: string;
  };
  incorrect_answers: Array<{
    text: string;
    result: string;
    selected: boolean;
    id: string;
  }>;
  difficulty?: string;
  question: string;
  type?: string;
  id: string;
  selectAnswer: (questionId: string, answerId: string) => void;
}

export interface answerInterface {
  answer: string;
  id: string;
  selectAnswer: () => void;
  selected: boolean;
}
export function QuestionAnswer({
  question,
  correct_answer,
  incorrect_answers,
  selectAnswer,
  id,
}: questionInterface) {
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
