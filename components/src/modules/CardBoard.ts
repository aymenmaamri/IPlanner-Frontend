import { Card } from "./Card";
import { Player } from "./Player";

export class CardBoard {
  public players: Player[];

  constructor(players: Player[]) {
    this.players = players;
  }
}
