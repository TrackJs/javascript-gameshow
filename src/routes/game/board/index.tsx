// import { h, Component, ComponentChild } from 'preact';
// import { Game } from 'src/Game';
// import { GameRepository } from 'src/GameRepository';

// // Game state components
// import GameWelcome from 'src/routes/game/start';
// import { GameController, GameState } from 'src/GameController';

// interface GameBoardProps {
//   gameId: string
// };

// export default class GameBoard extends Component<GameBoardProps, GameState> {

//   constructor(props: GameBoardProps) {
//     super();
//     this.state = GameController.init(() => this.state, this.setState.bind(this), props.gameId);
//   }

//   render(): ComponentChild {
//     if (!this.state.game) {
//       return (<div><h1>404: Game Not Found</h1></div>);
//     }

//     if (!this.state.hasStarted) {
//       return (<GameWelcome />);
//     }

//     return (<div><h1>GO!!</h1></div>);
//   }


// }

