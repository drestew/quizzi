import { useState, useEffect } from 'react'
import './App.css'
import './components/Question'
import {QuestionAnswer} from "./components/Question";

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
    const [questions, setQuestions] = useState(qArr)
    // useEffect(() => {
    //     fetch('https://opentdb.com/api.php?amount=10&category=17&difficulty=medium&type=multiple')
    //         .then(resp => resp.json())
    //         .then(data => setQuestions(data))
    // }, [])



    const questionList = questions.map(question => {
        return <QuestionAnswer  category={question.category} />
    })

    return (
    <div className="App">
        {questionList}
    </div>
    )
}

export default App
