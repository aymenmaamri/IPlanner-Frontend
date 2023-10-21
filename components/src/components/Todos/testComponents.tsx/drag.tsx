import Draggable from "react-draggable";

export const Drag = () => {
  return (
    <Draggable>
      <div style={{ backgroundColor: "red", width: "300px" }}>
        I can now be moved around!
      </div>
    </Draggable>
  );
};
