import { Card } from "./Card";

export class Player {
  public cardHand: Card[] = [];
  public name: string;
  public avatar: string;

  constructor(name: string, avatar: string) {
    this.name = name;
    this.avatar = avatar;
  }

  addCardToHand = (card: Card) => {
    this.cardHand.push(card);
  };
}
