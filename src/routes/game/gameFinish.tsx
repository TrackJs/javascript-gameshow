import { h, Component, ComponentChild } from 'preact';
import { UrlRouteProps } from 'src/app';

export default class Finish extends Component<UrlRouteProps, any> {

  render(): ComponentChild {

    return(
      <div>
        <h1>Finishing the game</h1>
      </div>
    );
  }


}

