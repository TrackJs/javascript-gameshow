import { h, Component, ComponentChild } from 'preact';
import { Game } from 'src/controllers/GameController';

export interface PrizeStackProps {
  game: Game
  questionIdx: number,
  highlightLowerIdx?: boolean
}

export default class PrizeStack extends Component<PrizeStackProps, any> {

  render(props: PrizeStackProps, state: any): ComponentChild {
    return(
      <ol class="prize-stack">
        {
          props.game.prizeStack.map((prize, i) => {
            let isCurrent = props.highlightLowerIdx ?
              (i <= props.questionIdx) :
              (i === props.questionIdx);

            return (
              <li class={`${prize.isThreshold === true ? "threshold" : ""} ${isCurrent ? "current" : ""}`}>
                <div class="name">{i+1}.&nbsp;&nbsp;{prize.name}</div>
                <div class="sponsor">{prize.sponsorName}</div>
              </li>
            );
          }).reverse()
        }
      </ol>
    );
  }

}
