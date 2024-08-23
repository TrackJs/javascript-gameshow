import { h, Component, ComponentChild } from 'preact';
import { Game, GameLifeLine, GameQuestion } from 'src/controllers/GameController';
import { SOUND, SoundController } from 'src/controllers/SoundController';
import { getRandomInteger } from 'src/utils/getRandomInteger';

export interface LifeLinesProps {
  game: Game,
  question: GameQuestion,
  disabled?: boolean,
  onUsed?: (lifeline: GameLifeLine) => void
}

interface LifeLinesState {
  selectedLifeLine?: GameLifeLine
  dismissLifeline?: boolean
}

export default class LifeLines extends Component<LifeLinesProps, LifeLinesState> {

  render(props: LifeLinesProps, state: LifeLinesState): ComponentChild {

    return (
      <div class="c-life-line flex">

        <div class="lifelines">
          {props.game.lifeLines.filter(ll => !ll.isUsed).map(ll => (
            <button type="button" class="btn btn-red btn-square glow" onClick={e => this.onClick(ll)}>
              <img src={ll.iconUrl} alt={ll.name} />
            </button>
          ))}
        </div>

        <div class={`lifeline-bar-wrap ${state.selectedLifeLine ? "show" : ""} ${state.dismissLifeline ? "dismiss" : ""}`}>
          <div class="lifeline-bar flex flex-column justify-center">
            <h2>{state.selectedLifeLine?.name}</h2>
            <div class="lifeline-options flex justify-center">
              {state.selectedLifeLine?.options?.map(o => (
                <div class="lifeline-option">
                  <img src={o.imageUrl} alt={o.name} />
                  <div class="option-name">{o.name}</div>
                </div>
              ))}
            </div>
            <div class="form-controls flex justify-center">
              <button type="button" class="btn btn-red" onClick={e => this.onDismiss()}>Dismiss</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  onClick(selectedLifeLine: GameLifeLine): void {
    if (this.props.disabled === true) {
      return;
    }

    if (selectedLifeLine.name === "50-50") {
      for (var i = 0; i < 2; i++) {
        let shownWrongAnswers = this.props.question.answers
          .filter(a => !a.hide && a.answerIdx !== this.props.question.correctAnswerIdx);
        let index = getRandomInteger(0, shownWrongAnswers.length);
        shownWrongAnswers[index].hide = true;
      }
    }

    SoundController.stopAll();
    SoundController.play(SOUND.lifeline_friend);
    this.setState({ selectedLifeLine });

    if (this.props.onUsed !== undefined) {
      this.props.onUsed(selectedLifeLine);
    }

  }

  onDismiss(): void {
    this.setState({ dismissLifeline: true });

    setTimeout(() => {
      this.setState({ selectedLifeLine: undefined, dismissLifeline: undefined });
    }, 2_000);
  }

}
