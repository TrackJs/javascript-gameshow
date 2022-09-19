export type Question = {
  text: string,
  options: {
    text: string,
    isCorrect?: boolean
  }[]
}

class _QuestionController {

  getQuestion(questionIdx: string) : Question {
    return {
      text: "Which is correct?",
      options: [
        {
          text: "A"
        },
        {
          text: "B",
          isCorrect: true
        },
        {
          text: "C"
        },
        {
          text: "D"
        }
      ]
    }
  }

}

export const QuestionController = new _QuestionController();
