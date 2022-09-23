import { h, Component, ComponentChild } from 'preact';
import { Game } from 'src/controllers/GameController';

export interface PrizeStackProps {
  game: Game
  questionIdx: number
}

export default class PrizeStack extends Component<PrizeStackProps, any> {

  render(props: PrizeStackProps, state: any): ComponentChild {
    return(
      <ol class="prize-stack">
        {
          props.game.prizeStack.map((prize, i) => (
            <li>
              <div class="name">{i+1}.&nbsp;&nbsp;{prize.name}</div>
              <div class="sponsor">{prize.sponsorName}</div>
            </li>
          )).reverse()
        }
      </ol>
    );
  }

}
