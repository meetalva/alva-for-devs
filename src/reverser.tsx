import * as React from "react";

export interface ReverserProps {
  /** @default This may be reversed by toggleing the "revert" property */
  text: string;
  /** @default false */
  revert: boolean;
}

export const Reverser: React.SFC<ReverserProps> = props => {
  return (
    <div>
      {props.revert
        ? props.text
            .split("")
            .reverse()
            .join("")
        : props.text}
    </div>
  );
};
