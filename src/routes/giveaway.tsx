import { h, Component, ComponentChild } from 'preact';
import { route } from 'preact-router';
import { UrlRouteProps } from 'src/app';
import AskQuestion from 'src/components/askQuestion';
import GameLogo from 'src/components/gameLogo';
import PrizeShow from 'src/components/prizeShow';
import { GameController } from 'src/controllers/GameController';
import { Prize, PrizeController } from 'src/controllers/PrizeController';
import { Question, QuestionController } from 'src/controllers/QuestionController';
import { SOUND, SoundController } from 'src/controllers/SoundController';
import { VideoBackgroundController } from 'src/controllers/VideoBackgroundController';

interface FindPlayerState {
	question?: Question
	prize?: Prize
}

export default class Giveaway extends Component<UrlRouteProps, FindPlayerState> {

	componentDidMount(): void {
		// SoundController.play(SOUND., 0, 50);
		VideoBackgroundController.playBackgroundLoop();
	}

	componentWillUnmount(): void {
		SoundController.stop(SOUND.find_player);
		VideoBackgroundController.pauseBackground();
	}

	render(props: UrlRouteProps, state: FindPlayerState) : ComponentChild {
		return (
			<div class="route-giveaway flex flex-column align-center">

        <div class={`box flex flex-column align-center ${!!state.prize ? "hide" : ""}`}>
          <h1><span class="sub">Who&apos;s ready to </span> <span class="main">Win?</span></h1>
          <div class="instruction">
            Fastest Tweet to <strong>@ToddHGardner</strong> with the correct answer
          </div>
        </div>

				{ this.state.prize ? (
					<div class="prize-wrap">
						<PrizeShow prize={state.prize as Prize} />
					</div>
				) : "" }

				{ this.state.question ? (
					<div class="question-wrap">
						<AskQuestion question={state.question as Question} />
					</div>
				) : "" }

				<div class="controls">
          <button class="btn btn-purple" type="button" onClick={e => route("/")}>Home</button>
					<button class="btn btn-purple" type="button" hidden={!!this.state.question} onClick={e => this.onShowQuestion()}>Show Question</button>
					<button class="btn btn-purple" type="button" hidden={!this.state.question} onClick={e => location.reload()}>Next</button>
				</div>

				<GameLogo />

			</div>
		);
	}

  private onShowQuestion() : void {
    SoundController.stop(SOUND.find_player);
    SoundController.play(SOUND.find_player, 51.6);
		VideoBackgroundController.playFanfare();

		// let games = GameController.getAllGames();
		let prize = PrizeController.getPrize("giveaway", 3);
		let question = QuestionController.getQuestion("giveaway", new Date().getMilliseconds(), prize.difficulty as 0|1|2|3|4);

		this.setState({ question, prize });
  }

	private onStartGame() : void {
		SoundController.stop(SOUND.find_player);
		SoundController.play(SOUND.result_win);
		route("/game/new");
	}

}