import { h, Component, ComponentChild } from 'preact';
import { Game } from 'src/controllers/GameController';

export interface PrizeShowProps {
  game: Game
  questionIdx: number
}

export default class PrizeStack extends Component<PrizeShowProps, any> {

  render(props: PrizeShowProps, state: any): ComponentChild {
    let prize = props.game.prizeStack[props.questionIdx];
    return(
      <div class="prize-show">
        <div class="prize-show-bg">
          <div class="prize-show-text flex justify-center align-center">
            <div class="prize-name">{prize.name}</div>
            <div class="prize-image">
              <img src={prize.imageUrl} alt={prize.name} />
            </div>
            <div class="prize-sponsor">
              <img src={prize.sponsorImageUrl} alt={prize.sponsorName} />
            </div>
          </div>
        </div>
      </div>
    );
  }

}
