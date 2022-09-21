import { h, Component, ComponentChild } from 'preact';
import { Game } from 'src/controllers/GameController';

export interface PrizeStackProps {
  game: Game
  questionIdx: number
}

export default class PrizeStack extends Component<PrizeStackProps, any> {

  render(props: PrizeStackProps, state: any): ComponentChild {
    return(
      <div>
        I am the prize stack
        <ol>
          {
            props.game.prizeStack.map(prize => (
              <li>{prize.name}{prize.questionIdx === props.questionIdx ? " (Current)" : ""}</li>
            )).reverse()
          }
        </ol>
      </div>
    );
  }

}
