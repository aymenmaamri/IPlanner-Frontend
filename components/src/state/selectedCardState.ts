import { atom } from "recoil";
import { Card } from "../../modules/Card";

export const selectedCardState = atom<Card | null>({
  key: "selectedCardState",
  default: null,
});
