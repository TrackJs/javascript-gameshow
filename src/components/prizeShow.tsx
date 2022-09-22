import { h, Component, ComponentChild } from 'preact';
import { Game } from 'src/controllers/GameController';

export interface PrizeShowProps {
  game: Game
  questionIdx: number
}

export default class PrizeStack extends Component<PrizeShowProps, any> {

  render(props: PrizeShowProps, state: any): ComponentChild {
    return(
      <div>
        I am the prize show
        {/* <ol>
          {
            props.game.prizeStack.map(prize => (
              <li>{prize.name}{prize.questionIdx === props.questionIdx ? " (Current)" : ""}</li>
            )).reverse()
          }
        </ol> */}
      </div>
    );
  }

}
