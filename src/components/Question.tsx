export interface questionInterface {
    category?: string
    correct_answer?: string
    difficulty?: string
    incorrect_answers?: Array<string | number>
    question?: string
    type?: string
}

export function QuestionAnswer ({question, correct_answer, incorrect_answers}: questionInterface) {
    // const randomIndex = Math.ceil(Math.random() * 3)
    // const answerArrMutable = incorrect_answers // to avoid mutating the incoming prop
    // // answerArrMutable.splice(randomIndex,0, correct_answer)
    // const answers = answerArrMutable.map(answer => {
    //     return <button className="question" key={Math.random() * 100}>{answer}</button>
    // })
    // console.log(correct_answer, randomIndex, answerArrMutable)
    console.log(question)
    return(
        <div className="question-container">
            <h2>This is the question {question}</h2>
            <div className="answer-container">
                {/*{answers}*/}
            </div>
        </div>
    )
}