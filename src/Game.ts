import { v4 as uuidv4 } from 'uuid';

export type GameOptions = {
  playerName: string;
}

export class Game {

  public id: string
  public playerName: string

  constructor(opts: GameOptions) {
    this.id = uuidv4();
    this.playerName = opts.playerName
  }
}