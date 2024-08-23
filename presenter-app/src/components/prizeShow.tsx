import { h, Component, ComponentChild } from 'preact';
import { GamePrize } from 'src/controllers/GameController';

export interface PrizeShowProps {
  prize: GamePrize
}

export default class PrizeShow extends Component<PrizeShowProps, any> {

  render(props: PrizeShowProps, state: any): ComponentChild {
    return (
      <div class="prize-show">
        <div class="prize-show-bg">
          <div class="prize-show-text flex justify-center align-center">
            <div class="prize-name">{props.prize.name}</div>
            <div class="prize-image">
              <img src={props.prize.imageUrl} alt={props.prize.name} />
            </div>
            <div class="prize-sponsor">
              <img src={props.prize.sponsorImageUrl} alt={props.prize.sponsorName} />
            </div>
          </div>
        </div>
      </div>
    );
  }

}
