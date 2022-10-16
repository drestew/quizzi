import { useState, useEffect } from 'react'
import './App.css'
import './components/Question'
import {QuestionAnswer, questionInterface} from "./components/Question";

const qArr = [
    {
        category: 'heller',
    },
    {
        category: "heller2"
    },
    {
        category: 'heller2'
    }
]

function App() {
    const [questions, setQuestions] = useState<questionInterface[]>([])
    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=10&category=17&difficulty=medium&type=multiple')
            .then(resp => resp.json())
            .then(data => setQuestions(data.results))
        console.log("render")
    }, [])
    // console.log(questions)


    const questionList = questions.map(question => {
        return <QuestionAnswer
            key={Math.random() * 100}
            question={question.question}
            correct_answer={question.correct_answer}
            incorrect_answers={question.incorrect_answers}
        />
    })

    return (
    <div className="App">
        {questionList}
    </div>
    )
}

export default App
