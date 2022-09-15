import { h, Component, ComponentChild } from 'preact';
import { route } from 'preact-router';
import { GameController } from 'src/GameController';
import style from './style.css';

export default class Home extends Component<any, any> {

	render() : ComponentChild {
		let games = GameController.getAllGames();
		const gameList = games.map((game) => (
			<li>
				<a href={`/game/${game.id}`}>{game.playerName}'s game at {game.startedOn}</a>
			</li>
		));

		return (
			<div class={style.home}>
				<h1>Hello World!</h1>
				<p>This is the Home component.</p>
				<a href="/game/new">Start a new game</a>
				<h2>Current Games:</h2>
				<ol>{gameList}</ol>
				<button type="button" onClick={this.onClearGames}>Clear Games</button>
			</div>
		);
	}

	onClearGames(e: Event) {
		GameController.clear();
		route("/", true);
	}

}