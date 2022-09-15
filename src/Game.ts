import { v4 as uuidv4 } from 'uuid';
import { DateTime } from 'luxon';

export type GameOptions = {
  playerName: string;
}

export class Game {

  public id: string
  public playerName: string
  public startedOn: DateTime

  constructor(opts: GameOptions) {
    this.id = uuidv4();
    this.playerName = opts.playerName
    this.startedOn = DateTime.now();
  }
}