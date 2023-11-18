import { jsx, css } from "@emotion/react";
import { flexbox } from "@mui/system";

import { ReactElement } from "react";
import { useRecoilValue } from "recoil";
import { Player } from "../../modules/Player";
import { AppHeader } from "../AppHeader";
import { loginState } from "../../state/loginState";
import { selectedCardState } from "../../state/selectedCardState";
import { Drag } from "../Todos/testComponents.tsx/drag";
import { CardHand } from "./CardHand";
import { PlanningCard } from "./PlanningCard";
import { PlanningTimer } from "./PlanningTimer";

const planningBoardStyles = css(`
display: flex;
flex-direction: column;
background-color: #bab08f;
border-radius: 40%; 
margin: 150px auto 20px auto;
box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
`);

const centerContainerStyles = css(`
display: flex;
height: 55vh;
width: 60vw;
justify-content: center;
`);

const storyNameStyles = css`
  align-self: center;
  font-size: 24px;
`;

const circleStyles = css(`
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #9ED0AE;
`);

const pos1 = css`
  ${circleStyles};
  top: 60%;
  left: 13%;
  transform: translate(-50%, 130%);
`;

const pos2 = css`
  ${circleStyles};
  top: 28%;
  left: 15%;
  transform: translate(-50%, 130%);
`;

const pos3 = css`
  ${circleStyles};
  top: 10%;
  left: 30%;
  transform: translate(-50%, 130%);
`;

const pos4 = css`
  ${circleStyles};
  top: 7%;
  left: 50%;
  transform: translate(-50%, 130%);
`;

const pos5 = css`
  ${circleStyles};
  top: 10%;
  left: 70%;
  transform: translate(-50%, 130%);
`;

const pos6 = css`
  ${circleStyles};
  top: 30%;
  left: 85%;
  transform: translate(-50%, 130%);
`;

const pos7 = css`
  ${circleStyles};
  top: 60%;
  left: 87%;
  transform: translate(-50%, 130%);
`;

type PlanningBoardProps = {
  storyName: string;
  players: Player[];
};

export const PlanningBoard = ({
  storyName = "my first story ",
}: PlanningBoardProps): ReactElement => {
  const login = useRecoilValue(loginState);
  const selectedCard = useRecoilValue(selectedCardState);

  return (
    <>
      <AppHeader username={login?.username} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <PlanningTimer time={10} />

        <div id="planning-board-container" css={planningBoardStyles}>
          <div css={pos1}></div>
          <div css={pos2}></div>
          <div css={pos3}></div>
          <div css={pos4}></div>
          <div css={pos5}></div>
          <div css={pos6}></div>
          <div css={pos7}></div>

          <div css={centerContainerStyles}>
            <p css={storyNameStyles}>{storyName}</p>
          </div>

          {selectedCard && (
            <div style={{ width: "fit-content", alignSelf: "center" }}>
              <PlanningCard
                card={selectedCard}
                onBoard={true}
                handleCardClicked={(selectedCard) => {
                  return;
                }}
              />
            </div>
          )}
        </div>
        <CardHand cards={[]} />
      </div>
    </>
  );
};
