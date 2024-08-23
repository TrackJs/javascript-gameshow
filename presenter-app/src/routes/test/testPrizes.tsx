import { h, Component, ComponentChild } from 'preact';
import PrizeShow from 'src/components/prizeShow';
import { GamePrize } from 'src/controllers/GameController';
import { PrizeController } from 'src/controllers/PrizeController';

export default class TestPrizes extends Component<any, any> {

  render(): ComponentChild {
    let prizes = new PrizeController()._prizeMap;

    return (
      <div class="route-test-prizes">
        {prizes.map(prize => {
          return (
            <div class="prize-show-wrap" style="margin: 20px 0">
              <PrizeShow prize={prize as GamePrize} />
            </div>
          );
        })}
      </div>
    );
  }


}
