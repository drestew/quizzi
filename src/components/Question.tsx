import {nanoid} from "nanoid";

export interface questionInterface {
    category?: string
    correct_answer: {
        text: string,
        result: string,
        selected: boolean
    }
    incorrect_answers: Array<{
        text: string,
        result: string,
        selected: boolean
    }>
    difficulty?: string
    question: string
    type?: string
    id: string
    selected: boolean
    selectAnswer: () => void
}

export function QuestionAnswer ({question, correct_answer, incorrect_answers, selectAnswer, selected}: questionInterface) {
    const randomIndex = Math.ceil(Math.random() * 3)
    // const answerArrMutable = incorrect_answers // to avoid mutating the incoming prop
    // answerArrMutable.splice(randomIndex,0, correct_answer)
    //TODO add all answers to sepearate array so the incoming prop (incorrect_answers) won't be mutated
    //TODO create a subarray of the answers: [answer, incorrect/correct]
    //TODO add a random number to be associated with each answer and then sort

    // const answers = answerArrMutable.map(answer => {
    //     return <button className="question" key={nanoid()} onClick={selectAnswer}>{answer}</button>
    // })

    return(
        <div className="question-container">
            <h2>This is the question {question}</h2>
            <div className="answer-container">
                {/*{answers}*/}
            </div>
        </div>
    )
}