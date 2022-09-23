import { h, Component, ComponentChild } from 'preact';
import { Question, QuestionAnswer } from 'src/controllers/QuestionController';
import { SOUND, SoundController } from 'src/controllers/SoundController';
import { shuffleArray } from 'src/utils/shuffleArray';

export interface AskQuestionProps {
  question: Question
  showAnswers?: boolean
  onResult?: (isCorrect: boolean) => void
}

export interface AskQuestionState {
  answers: QuestionAnswer[]
  answerId: string,
  isCorrect: boolean
  isFinal: boolean
  showAnswers: boolean
  showResult: boolean
}

export default class AskQuestion extends Component<AskQuestionProps, AskQuestionState> {

  constructor(props: AskQuestionProps) {
    super();
    this.state = {
      answers: shuffleArray(props.question.answers),
      answerId: "",
      isCorrect: false,
      isFinal: false,
      showAnswers: props.showAnswers || false,
      showResult: false
    };
  }

  render(props: AskQuestionProps, state: AskQuestionState): ComponentChild {
    let question = props.question;
    let answers = state.answers;

    return(
      <form class="c-ask-question flex flex-column align-center" onSubmit={e => this.onFinalAnswer(e)}>
        <div class="question-text-bg">
          <div class="flex question-text justify-center align-center">
            {question.type === "code" ?
              <div class="flex flex-column">
                <span class="code-result">What is the result of this JavaScript?</span>
                <pre class={question.text.length >= 30 ? "small" : "" }>{question.text}</pre>
              </div> :
              <span>{question.text}</span>
            }
          </div>
        </div>
        <ol class="answers">
          <div class="answer-row flex justify-center">
            {
              answers
                .filter((answer, i) => i <= 1)
                .map((answer, i) =>
                  this.renderAnswer(state, i, question, answer)
                )
            }
          </div>
          <div class="answer-row flex justify-center">
            {
              answers
                .filter((answer, i) => i > 1)
                .map((answer, i) =>
                  this.renderAnswer(state, i+2, question, answer)
                )
            }
          </div>
        </ol>
        <div class="form-controls">
          <button class="btn btn-orange btn-round" hidden={state.showAnswers} type="button" onClick={e => this.onShowAnswers()}>Show<br/>Answers</button>
          <button class="btn btn-orange btn-round" hidden={state.isFinal || !state.showAnswers} type="submit">Final<br/>Answer</button>
        </div>
      </form>
    );
  }

  private renderAnswer(state: AskQuestionState, index: number, question: Question, answer: QuestionAnswer) : ComponentChild {
    const ANSWER_LABEL = ["A","B","C","D"];

    return (
      <li>
        <input type="radio" name="selectedAnswerId" value={answer.id} id={`q${question.id}-a${answer.id}`}
          checked={state.answerId === answer.id}
          class={`${(state.showResult && question.correctId === answer.id) ? "correct" : ""}`}></input>
        <label for={`q${question.id}-a${answer.id}`}>
          <div class={`answer-text flex align-center ${state.showAnswers ? "show" : ""}`}
            style={`transition: opacity 200ms ease-in-out ${index}s`}>
            <span class="letter">{ANSWER_LABEL[index]}:</span>&nbsp;
            {question.type === "code" ?
              <pre class={answer.text.length >= 20 ? "small" : "" }>{answer.text}</pre> :
              <span>{answer.text}</span>
            }
          </div>
        </label>
      </li>
    )
  }

  private onShowAnswers() {
    this.setState({ showAnswers: true });
  }

  private onFinalAnswer(e: Event) {
    e.preventDefault();

    let formData = new FormData(e.target as HTMLFormElement);
    let answerId = formData.get("selectedAnswerId") as string;
    let isCorrect = (answerId === this.props.question.correctId);

    SoundController.play(SOUND.final_answer);

    this.setState({ answerId, isCorrect, isFinal: true });

    setTimeout(() => {
      this.setState({ showResult: true });
      SoundController.play(isCorrect ? SOUND.result_win : SOUND.result_lose);
      if (this.props.onResult) {
        this.props.onResult(isCorrect);
      }
    }, 5_000);
  }

}
