import { h, Component, ComponentChild } from 'preact';
import { Game, GameController, GameLifeLine } from 'src/controllers/GameController';

export interface LifeLinesProps {
  game: Game,
  disabled?: boolean
}

interface LifeLinesState {
  selectedLifeLine?: GameLifeLine
  dismissLifeline?: boolean
}

export default class LifeLines extends Component<LifeLinesProps, LifeLinesState> {

  render(props: LifeLinesProps, state: LifeLinesState): ComponentChild {

    return(
      <div class="c-life-line flex">

        <div class="lifelines">
          { props.game.lifeLines.filter(ll => !ll.isUsed).map(ll => (
            <button type="button" class="btn btn-red btn-square glow" onClick={e => this.onClick(ll)}>
              <img src={ll.iconUrl} alt={ll.name} />
            </button>
          ))}
        </div>

        <div class={`lifeline-bar-wrap ${state.selectedLifeLine ? "show" : ""} ${state.dismissLifeline ? "dismiss" : ""}`}>
          <div class="lifeline-bar flex flex-column justify-center">
            <h2>{state.selectedLifeLine?.name}</h2>
            <div class="lifeline-options flex justify-center">
              { state.selectedLifeLine?.options.map(o => (
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

  onClick(selectedLifeLine : GameLifeLine): void {
    if (this.props.disabled === true) {
      return;
    }

    this.setState({ selectedLifeLine });
    selectedLifeLine.isUsed = true;
    GameController.saveGame(this.props.game);
  }

  onDismiss(): void {
    this.setState({ dismissLifeline: true });
    setTimeout(() => {
      this.setState({ selectedLifeLine: undefined, dismissLifeline: undefined });
    }, 2_000);
  }

}
