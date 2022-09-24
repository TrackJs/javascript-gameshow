import { h, Component, ComponentChild } from 'preact';
import PrizeShow from 'src/components/prizeShow';
import { PrizeController } from 'src/controllers/PrizeController';

export default class TestPrizes extends Component<any, any> {

  render(): ComponentChild {
		PrizeController.logPrizes();
    let prizes = PrizeController.getAllPrizes();

    return (
			<div class="route-test-prizes">
        { prizes.map(prize => {
          return (
            <div class="prize-show-wrap" style="margin: 20px 0">
              <PrizeShow prize={prize} />
            </div>
          );
        })}
			</div>
		);
  }


}
