import { css } from "@emotion/react";
import { ReactElement, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Card } from "../../modules/Card";
import { initializeHand } from "../cardUtils/utils";
import { selectedCardState } from "../../state/selectedCardState";
import { PlanningCard } from "./PlanningCard";
import { keyframes } from "@emotion/react";

const cardHandStyles = css(`
display: flex;
height: fit-content;
background-color: #9ED0AE;
border-radius: 15%;
align-self: center;
box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
padding: 0 25px;
margin: 0 0 30px 0;
`);

type CardHandProps = {
  cards: Card[];
};

export const CardHand = ({ cards }: CardHandProps): ReactElement => {
  const [myHand, setMyHand] = useState<Card[]>(initializeHand());
  const setSelectedCard = useSetRecoilState(selectedCardState);

  const handleCardClicked = (card: Card | null) => {
    setSelectedCard(card);
  };

  return (
    <div css={cardHandStyles}>
      {myHand.map((card) => (
        <PlanningCard
          key={card.value}
          card={card}
          onBoard={false}
          handleCardClicked={handleCardClicked}
        />
      ))}
    </div>
  );
};
