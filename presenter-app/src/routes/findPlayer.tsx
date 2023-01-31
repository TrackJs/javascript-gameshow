import { h, Component, ComponentChild } from 'preact';
import { route } from 'preact-router';
import { UrlRouteProps } from 'src/app';
import AskQuestion from 'src/components/askQuestion';
import GameLogo from 'src/components/gameLogo';
import { GameController } from 'src/controllers/GameController';
import { Question, QuestionController } from 'src/controllers/QuestionController';
import { SOUND, SoundController } from 'src/controllers/SoundController';
import { VideoBackgroundController } from 'src/controllers/VideoBackgroundController';

export default class FindPlayer extends Component<UrlRouteProps, any> {

	componentDidMount(): void {
		SoundController.play(SOUND.find_player, 0, 50);
		VideoBackgroundController.playBackgroundLoop();
	}

	componentWillUnmount(): void {
		SoundController.stop(SOUND.find_player);
		VideoBackgroundController.pauseBackground();
	}

	render(props: UrlRouteProps, state: any) : ComponentChild {
		return (
			<div class="route-find-player flex flex-column align-center">

        <div class="box flex flex-column align-center">
          <h1><span class="sub">Who&apos;s ready to be a</span> <span class="main">JavaScriptær?</span></h1>
          <div class="instruction">
						<img src="/assets/images/audience-app-qr.png" width="500" height="500" />
						<p><strong>javascript-gameshow.web.app</strong></p>
          </div>
        </div>

				<div class="controls">
          <button class="btn btn-purple" type="button" onClick={e => route("/")}>Home</button>
					{/* <button class="btn btn-purple" type="button" hidden={!!this.state.question} onClick={e => this.onShowQuestion()}>Show Question</button> */}
					<button class="btn btn-purple" type="button" hidden={false} onClick={e => this.onStartGame()}>Start Game</button>
				</div>

				<GameLogo />

			</div>
		);
	}

  // private onShowQuestion() : void {
  //   SoundController.stop(SOUND.find_player);
  //   SoundController.play(SOUND.find_player, 51.6);
	// 	VideoBackgroundController.playFanfare();

	// 	let games = GameController.getAllGames();
	// 	let question = QuestionController.getQuestion("find-player", games.length, 9);

	// 	this.setState({ question });
  // }

	private onStartGame() : void {
		SoundController.stop(SOUND.find_player);
		SoundController.play(SOUND.result_win);
		route("/game/new");
	}

}