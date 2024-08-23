import { getRandomInteger } from "../utils/getRandomInteger"
import { Questions, Question, Answer } from "../questions";

interface QuestionUsage {
  questionIdx: number
  askIdx: number
  gameId: string
}

export interface AnswerLookup extends Answer {
  answerIdx: number
}

export interface QuestionLookup extends Question {
  questionIdx: number,
  askedOn: string | null,
  answers: AnswerLookup[]
}

export class QuestionController {

  _STORAGE_KEY = "question-usage";
  _questionUsage: QuestionUsage[];
  _questionMap: QuestionLookup[];

  constructor() {
    this._questionUsage = this._loadUsage();
    this._questionMap = Questions
      .map((question, idx) => {
        const usage = this._questionUsage.find((usage) => usage.questionIdx === idx);
        return {
          questionIdx: idx,
          askedOn: usage ? `${usage.gameId}-${usage.askIdx}` : null,
          ...question,
          answers: question.answers.map((answer, answerIdx) => {
            return {
              answerIdx,
              ...answer
            }
          })
        }
      });
  }

  /**
   * Get a random question at the specified difficulty for the game. If it has already been
   * requested, the same question is returned.
   */
  getQuestion(gameId: string, askIdx: number): QuestionLookup {
    const askedQuestion = this._questionMap.find((question) => question.askedOn === `${gameId}-${askIdx}`);
    if (askedQuestion) {
      return askedQuestion;
    }

    const availableQuestions = this._questionMap
      .filter((question) => !question.askedOn)
      .filter((question) => question.level === askIdx);

    const chosenQuestion = availableQuestions[getRandomInteger(0, availableQuestions.length)];
    if (!chosenQuestion) {
      throw new Error(`No questions remaining for difficulty ${askIdx}.`);
    }

    chosenQuestion.askedOn = `${gameId}-${askIdx}`;
    this._updateUsage(chosenQuestion, gameId, askIdx);
    return chosenQuestion;
  }

  getQuestionStats(): { label: string, value: number }[] {
    const remainingLevel0 = this._questionMap.filter((q) => !q.askedOn && q.level === 0).length;
    const remainingLevel1 = this._questionMap.filter((q) => !q.askedOn && q.level === 1).length;
    const remainingLevel2 = this._questionMap.filter((q) => !q.askedOn && q.level === 2).length;
    const remainingLevel3 = this._questionMap.filter((q) => !q.askedOn && q.level === 3).length;
    const remainingLevel4 = this._questionMap.filter((q) => !q.askedOn && q.level === 4).length;
    return [
      {
        label: "Total Questions",
        value: this._questionMap.length
      },
      {
        label: "Remaining Questions",
        value: this._questionMap.filter((q) => !q.askedOn).length
      },
      {
        label: "Level 0",
        value: remainingLevel0
      },
      {
        label: "Level 1",
        value: remainingLevel1
      },
      {
        label: "Level 2",
        value: remainingLevel2
      },
      {
        label: "Level 3",
        value: remainingLevel3
      },
      {
        label: "Level 4",
        value: remainingLevel4
      },
      {
        label: "Remaining Games",
        value: Math.min(remainingLevel0, remainingLevel1, remainingLevel2, remainingLevel3, remainingLevel4)
      }
    ];
  }

  _loadUsage(): QuestionUsage[] {
    return JSON.parse(localStorage.getItem(this._STORAGE_KEY) || "[]");
  }

  _updateUsage(question: QuestionLookup, gameId: string, askIdx: number): void {
    this._questionUsage.push({
      questionIdx: question.questionIdx,
      askIdx,
      gameId
    });
    localStorage.setItem(this._STORAGE_KEY, JSON.stringify(this._questionUsage));
  }
}