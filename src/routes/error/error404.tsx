// When the game or question or whatever doesn't exist.
import { h, Component, ComponentChild } from 'preact';

export default class Error404 extends Component<any, any> {

	render() : ComponentChild {
		return (
      <div>
        <h1>Error: 404</h1>
      </div>
		);
	}

}