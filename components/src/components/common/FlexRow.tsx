import React, { ReactElement, ReactNode } from "react";

type FlexRowProps = {
  style?: React.CSSProperties;
  className?: string;
  children: ReactNode;
};

function FlexRow({ style, className, children }: FlexRowProps): ReactElement {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        padding: 0,
        margin: 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default FlexRow;
