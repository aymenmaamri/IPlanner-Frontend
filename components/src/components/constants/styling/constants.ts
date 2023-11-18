export const defaultCardHeight: string = "300px";
export const defaultCardWidth: string = "100px";

export enum cardTypes {
  HEART = "heart",
  SPADE = "spade",
  CLUB = "club",
  DIAMOND = "diamond",
}

const spadeCardsUnicodeMap = new Map<number, string>([
  [1, "\u{1F0A1}"],
  [2, "\u{1F0A2}"],
  [3, "\u{1F0A3}"],
  [4, "\u{1F0A4}"],
  [5, "\u{1F0A5}"],
  [6, "\u{1F0A6}"],
  [7, "\u{1F0A7}"],
  [8, "\u{1F0A8}"],
  [9, "\u{1F0AA}"],
  [10, "\u{1F0AB}"],
  [11, "\u{1F0AC}"],
  [12, "\u{1F0AD}"],
  [13, "\u{1F0AE}"],
]);

const heartCardsUnicodeMap = new Map<number, string>([
  [1, "\u{1F0B1}"],
  [2, "\u{1F0B2}"],
  [3, "\u{1F0B3}"],
  [4, "\u{1F0B4}"],
  [5, "\u{1F0B5}"],
  [6, "\u{1F0B6}"],
  [7, "\u{1F0B7}"],
  [8, "\u{1F0B8}"],
  [9, "\u{1F0BA}"],
  [10, "\u{1F0BB}"],
  [11, "\u{1F0BC}"],
  [12, "\u{1F0BD}"],
  [13, "\u{1F0BE}"],
]);

const diamondCardsUnicodeMap = new Map<number, string>([
  [1, "\u{1F0C1}"],
  [2, "\u{1F0C2}"],
  [3, "\u{1F0C3}"],
  [4, "\u{1F0C4}"],
  [5, "\u{1F0C5}"],
  [6, "\u{1F0C6}"],
  [7, "\u{1F0C7}"],
  [8, "\u{1F0C8}"],
  [9, "\u{1F0CA}"],
  [10, "\u{1F0CB}"],
  [11, "\u{1F0CC}"],
  [12, "\u{1F0CD}"],
  [13, "\u{1F0CE}"],
]);

const clubCardsUnicodeMap = new Map<number, string>([
  [1, "\u{1F0D1}"],
  [2, "\u{1F0D2}"],
  [3, "\u{1F0D3}"],
  [4, "\u{1F0D4}"],
  [5, "\u{1F0D5}"],
  [6, "\u{1F0D6}"],
  [7, "\u{1F0D7}"],
  [8, "\u{1F0D8}"],
  [9, "\u{1F0DA}"],
  [10, "\u{1F0DB}"],
  [11, "\u{1F0DC}"],
  [12, "\u{1F0DD}"],
  [13, "\u{1F0DE}"],
]);

export const cardTypeRepresentationMap = new Map<
  cardTypes,
  Map<number, string>
>([
  [cardTypes.HEART, heartCardsUnicodeMap],
  [cardTypes.SPADE, spadeCardsUnicodeMap],
  [cardTypes.CLUB, clubCardsUnicodeMap],
  [cardTypes.DIAMOND, diamondCardsUnicodeMap],
]);
