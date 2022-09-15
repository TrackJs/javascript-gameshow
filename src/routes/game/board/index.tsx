import { h, Component, ComponentChild } from 'preact';
import { Game } from 'src/Game';
import { GameController } from 'src/GameController';

interface GameBoardProps {
  gameId: string
};

interface GameBoardState {
  game: Game | null
};

export default class GameBoard extends Component<GameBoardProps, GameBoardState> {

  constructor(props: GameBoardProps) {
    super();

    this.state = {
      game: GameController.getGame(props.gameId)
    };
  }

  render(): ComponentChild {
    if (!this.state.game) {
      return (<div><h1>404: Game Not Found</h1></div>);
    }

    return (
    	<div>
        <h1>Game {this.state.game.id} by {this.state.game.playerName}</h1>
      </div>
    );
  }


}

