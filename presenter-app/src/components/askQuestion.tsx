import { h, Component, ComponentChild } from 'preact';
import { Game, GameAnswer, GameQuestion } from 'src/controllers/GameController';
import { SOUND, SoundController } from 'src/controllers/SoundController';
import { shuffleArray } from 'src/utils/shuffleArray';

export interface AskQuestionProps {
  game: Game
  question: GameQuestion
  playerAnswerIdx?: number
  showAnswers?: boolean
  onResult?: (playerAnswerIdx: number, isCorrect: boolean) => void
}

export interface AskQuestionState {
  displayedAnswers: any[]
  playerAnswerIdx?: number,
  isCorrect: boolean
  isFinal: boolean
  showAnswers: boolean
  showResult: boolean
}

export default class AskQuestion extends Component<AskQuestionProps, AskQuestionState> {

  constructor(props: AskQuestionProps) {
    super();
    this.state = {
      displayedAnswers: shuffleArray(props.question?.answers || []),
      playerAnswerIdx: props.playerAnswerIdx,
      isCorrect: props.question?.correctAnswerIdx === props.playerAnswerIdx,
      isFinal: props.playerAnswerIdx != undefined,
      showAnswers: !!props.showAnswers,
      showResult: props.playerAnswerIdx != undefined
    };
  }

  render(props: AskQuestionProps, state: AskQuestionState): ComponentChild {
    return (
      <form class="c-ask-question flex flex-column align-center" onSubmit={e => this.onFinalAnswer(e)}>
        <div class="question-text-bg">
          <div class="flex question-text justify-center align-center">
            {props.question.type === "code" ?
              <div class="flex flex-column">
                <span class="code-result">What is the result of this JavaScript?</span>
                <pre class={props.question.text.length >= 30 ? "small" : ""}>{props.question.text}</pre>
              </div> :
              <span>{props.question.text}</span>
            }
          </div>
        </div>
        <ol class="answers">
          <div class="answer-row flex justify-center">
            {
              state.displayedAnswers
                .filter((answer, i) => i <= 1)
                .map((answer, i) =>
                  this.renderAnswer(state, i, props.question, answer)
                )
            }
          </div>
          <div class="answer-row flex justify-center">
            {
              state.displayedAnswers
                .filter((answer, i) => i > 1)
                .map((answer, i) =>
                  this.renderAnswer(state, i + 2, props.question, answer)
                )
            }
          </div>
        </ol>
        <div class="form-controls">
          <button class="btn btn-orange btn-round" hidden={state.showAnswers} type="button" onClick={e => this.onShowAnswers()}>Show<br />Answers</button>
          <button class="btn btn-orange btn-round" hidden={state.isFinal || !state.showAnswers} type="submit">Final<br />Answer</button>
        </div>
      </form>
    );
  }

  private renderAnswer(state: AskQuestionState, index: number, question: GameQuestion, answer: GameAnswer): ComponentChild {
    const ANSWER_LABEL = ["A", "B", "C", "D"];

    return (
      <li>
        <input type="radio" name="selectedAnswerIdx" value={answer.answerIdx} id={`q${question.questionIdx}-a${answer.answerIdx}`}
          checked={state.playerAnswerIdx === answer.answerIdx}
          class={`${(state.showResult && question.correctAnswerIdx === answer.answerIdx) ? "correct" : ""}`} />
        <label for={`q${question.questionIdx}-a${answer.answerIdx}`}>
          <div class={`answer-text flex align-center ${state.showAnswers ? "show" : ""}`}
            style={`transition: opacity 200ms ease-in-out ${index}s`}>
            <span class="letter">{ANSWER_LABEL[index]}:</span>&nbsp;
            {answer.hide === true ? "" :
              question.type === "code" ?
                <pre class={answer.text.length >= 20 ? "small" : ""}>{answer.text}</pre> :
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

    const formData = new FormData(e.target as HTMLFormElement);
    const playerAnswerIdx = parseInt(formData.get("selectedAnswerIdx") as string, 10);
    const isCorrect = (playerAnswerIdx === this.props.question.correctAnswerIdx);

    SoundController.stopAll();
    SoundController.play(SOUND.final_answer);

    this.setState({ playerAnswerIdx, isCorrect, isFinal: true });

    setTimeout(() => {
      this.setState({ showResult: true });
      SoundController.play(isCorrect ? SOUND.result_win : SOUND.result_lose);
      if (this.props.onResult) {
        this.props.onResult(playerAnswerIdx, isCorrect);
      }
    }, 5_000);
  }
}
