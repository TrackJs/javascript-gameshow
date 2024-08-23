import { h, Component, ComponentChild } from 'preact';
import { route } from 'preact-router';
import GameLogo from 'src/components/gameLogo';
import { PrizeController } from 'src/controllers/PrizeController';
import { QuestionController } from 'src/controllers/QuestionController';

export default class TestEventState extends Component<any, any> {

  render(): ComponentChild {
    const questionStats = new QuestionController().getQuestionStats();
    const prizeStats = new PrizeController().getPrizeStats();

    return (
      <div class="route-test-event-state flex justify-center align-center">

        <div class="stats flex">
          <div class="question-stats flex-column">
            <h2>Question Status</h2>
            {questionStats.map((stat) => {
              return (
                <div>{stat.label}: <strong>{stat.value}</strong></div>
              );
            })}
          </div>
          <div class="prize-stats flex-column">
            <h2>Prize Status</h2>
            {prizeStats.map((stat) => {
              return (
                <div>{stat.label}: <strong>{stat.value}</strong></div>
              );
            })}
          </div>
        </div>

        <div class="controls">
          <button class="btn btn-purple" type="button" onClick={e => route('/')}>Home</button>
        </div>

        <GameLogo />

      </div>
    );
  }


}
