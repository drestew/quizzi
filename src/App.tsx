import { useState, useEffect } from 'react'
import './App.css'
import './components/Question'
import {QuestionAnswer, questionInterface} from "./components/Question";
import {nanoid} from "nanoid";

function App() {
    const [questions, setQuestions] = useState<questionInterface[]>([])
    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=10&category=17&difficulty=medium&type=multiple')
            .then(resp => resp.json())
            .then(data => setQuestions(() => data.results.map((question: questionInterface) => {
                return {
                    ...question,
                    id: nanoid(),
                    correct_answer: {
                        text: question.correct_answer,
                        result: 'correct', // this is to specify which answer is which once the correct answer and
                        // incorrect answers are combined into a single array
                        selected: false
                    },
                   incorrect_answers: question.incorrect_answers.map(answer => {
                       return {
                           text: answer,
                           result: 'incorrect',
                           selected: false
                       }
                   })
                }
            })))

    }, [])
    console.log(questions)

    function selectAnswer (id: string): void {
        return setQuestions(questions => questions.map(question => {
            return question.id === id ? {...question, selected: !question.selected} : question
        }))
    }

    const questionList = questions.map(question => {
        return <QuestionAnswer
            key={question.id}
            question={question.question}
            correct_answer={question.correct_answer}
            incorrect_answers={question.incorrect_answers}
            id={question.id}
            selected={question.selected}
            selectAnswer={() => selectAnswer(question.id)}
        />
    })

    return (
    <div className="App">
        {questionList}
    </div>
    )
}

export default App
