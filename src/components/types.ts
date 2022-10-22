export interface question {
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
  answerCorrect: boolean;
}

export interface answer {
  answer: string;
  id: string;
  selectAnswer: () => void;
  selected: boolean;
  quizComplete: boolean;
}
