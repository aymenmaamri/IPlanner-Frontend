import { cardTypes } from "../components/constants/styling/constants";
export class Card {
  public value: number;
  public color: string;
  public type: cardTypes;

  constructor(value: number, color: string, type: cardTypes) {
    this.value = value;
    this.color = color;
    this.type = type;
  }

  get cardValue(): number {
    return this.value;
  }

  changeCardColor = (newColor: string) => {
    this.color = newColor;
  };
}
