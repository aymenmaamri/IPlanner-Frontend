import { css, keyframes } from "@emotion/react";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Card } from "../../modules/Card";
import { getCardRepresentation } from "../cardUtils/utils";
import {
  cardTypeRepresentationMap,
  cardTypes,
} from "../constants/styling/constants";
import { selectedCardState } from "../state/selectedCardState";
import ClearIcon from "@mui/icons-material/Clear";

const styles = (color: string, animate: boolean) => css`
  display: flex;
  flex-direction: column;
  gap: 0;
  color: ${color};
  font-size: 6rem;
  cursor: pointer;
  ${animate ? playCardAnimation : ""}
`;

const playCardAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
`;

type PlanningCardProps = {
  card: Card;
  onBoard: boolean;
  handleCardClicked: (card: Card | null) => void;
};

export const PlanningCard = ({
  card,
  onBoard = false,
  handleCardClicked,
}: PlanningCardProps) => {
  const [selectedCard, setSelectedCard] = useRecoilState(selectedCardState);
  const [hovered, setHovered] = useState<boolean>(false);
  const [isAnimated, setAnimated] = useState(false);

  const cardDeselectBtn = () => (
    <ClearIcon
      onClick={() => setSelectedCard(null)}
      style={{
        color: `${card.color}`,
        alignSelf: "center",
        margin: 0,
      }}
    />
  );
  return (
    <div
      css={styles(card.color, isAnimated)}
      onClick={() => {
        setAnimated(true);
        handleCardClicked(card);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered &&
        card.value === selectedCard?.value &&
        onBoard &&
        cardDeselectBtn()}
      {getCardRepresentation(card.type, card.value, cardTypeRepresentationMap)}
    </div>
  );
};
