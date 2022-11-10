import { h, Component, ComponentChild } from 'preact';
import { route } from 'preact-router';

export default class ErrorNotFound extends Component<any, any> {

	render() : ComponentChild {
		return (
      <div class="route-error-not-found flex justify-center align-center">
        <h1>Page Not Found</h1>

        <div class="controls">
          <button class="btn btn-purple" type="button" onClick={e => route("/")}>Home</button>
        </div>
      </div>
		);
	}

}