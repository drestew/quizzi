export interface questionInterface {
    category?: string
    correct_answer?: string
    difficulty?: string
    incorrect_answers?: Array<string | number>
    question?: string
    type?: string
}
// export interface test {
//     name: string
// }
// export function QuestionAnswer (prop: test) {
//
//     return(
//         <div className="question-container">
//             <h2>This is the question {prop.name}</h2>
//             <div className="answer-container">
//                 <button className="question">Answer</button>
//                 <button className="question">Answer</button>
//                 <button className="question">Answer</button>
//                 <button className="question">Answer</button>
//             </div>
//         </div>
//     )
// }

export function QuestionAnswer (prop: questionInterface) {

    return(
        <div className="question-container">
            <h2>This is the question {prop.category}</h2>
            <div className="answer-container">
                <button className="question">Answer</button>
                <button className="question">Answer</button>
                <button className="question">Answer</button>
                <button className="question">Answer</button>
            </div>
        </div>
    )
}