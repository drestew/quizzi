export interface question {
  category?: string;
  correct_answer: Array<{
    text: string | number;
    result: string;
    selected: boolean;
    id: string;
  }>;
  incorrect_answers: Array<{
    text: string | number;
    result: string;
    selected: boolean;
    id: string;
  }>;
  difficulty?: string;
  question: string;
  type: string;
  id: string;
  selectAnswer: (questionId: string, answerId: string) => void;
  answerCorrect: boolean;
  quizComplete: boolean;
  answers: Array<{
    text: string | number;
    result: string;
    selected: boolean;
    id: string;
  }>;
}

export interface answer {
  text: string;
  id: string;
  selectAnswer: () => void;
  selected: boolean;
  quizComplete: boolean;
  answers: Array<{
    text: string | number;
    result: string;
    selected: boolean;
    id: string;
  }>,
}

export interface modal {
  startQuiz: () => void;
}
