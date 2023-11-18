import { Card } from "../../modules/Card";
import { cardTypes } from "../constants/styling/constants";

export const getCardRepresentation = (
  type: cardTypes,
  value: number,
  cardMap: Map<cardTypes, Map<number, string>>
): string | undefined => {
  return cardMap.get(type)?.get(value);
};

export const initializeHand = (): Card[] => {
  return [
    new Card(1, "red", cardTypes.HEART),
    new Card(2, "black", cardTypes.SPADE),
    new Card(3, "black", cardTypes.SPADE),
    new Card(5, "red", cardTypes.DIAMOND),
    new Card(8, "red", cardTypes.HEART),
    new Card(13, "black", cardTypes.SPADE),
  ];
};
