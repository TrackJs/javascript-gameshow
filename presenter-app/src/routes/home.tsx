import { h, Component, ComponentChild } from 'preact';
import { route } from 'preact-router';
import { SOUND, SoundController } from 'src/controllers/SoundController';
import { VideoBackgroundController } from 'src/controllers/VideoBackgroundController';

export default class Home extends Component<any, any> {

	componentDidMount(): void {
		SoundController.play(SOUND.opening_theme);
		VideoBackgroundController.playBackgroundLoop();
	}

	componentWillUnmount(): void {
		SoundController.stopAll();
		VideoBackgroundController.pauseBackground();
	}

	render() : ComponentChild {
		return (
			<div class="route-home flex flex-column justify-center align-center">

				<div class="home-game-logo">
					<img class="glow" src="/assets/images/logo.png" height="500" width="500"/>
				</div>

				<div class="controls">
					<button class="btn btn-purple" type="button" onClick={e => route('/find-player')}>Find Player</button>
					<button class="btn btn-purple" type="button" onClick={e => route(`/games`)}>List Games</button>
				</div>

			</div>
		);
	}

}