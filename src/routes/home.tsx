import { h, Component, ComponentChild } from 'preact';
import { route } from 'preact-router';
import { SOUND, SoundController } from 'src/controllers/SoundController';

export default class Home extends Component<any, any> {

	componentDidMount(): void {
		SoundController.play(SOUND.opening_theme);
	}

	componentWillUnmount(): void {
		SoundController.stop(SOUND.opening_theme);
	}

	render() : ComponentChild {
		return (
			<div class="route-home flex flex-column justify-center align-center">

				<div class="home-game-logo">
					<img src="/assets/images/logo.png" height="500" width="500"/>
				</div>

				<div class="controls">
					<button class="btn btn-purple" type="button" onClick={e => route('/find-player')}>Find Player</button>
					<button class="btn btn-purple" type="button" onClick={e => route(`/games`)}>List Games</button>
				</div>

			</div>
		);
	}

}