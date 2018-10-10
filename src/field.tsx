import * as React from "react";

export interface FieldProps {
  onMouseMove: React.MouseEventHandler<HTMLInputElement>;
  children: React.ReactNode;
}

export const Field: React.SFC<FieldProps> = props => {
  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%' }} onMouseMove={props.onMouseMove}>
      {props.children}
    </div>
  );
};

const style: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 250,
  width: "100%",
  border: "5px dashed currentColor",
  boxSizing: "border-box",
  color: "#999",
  fontFamily: "sans-serif",
  fontSize: "3em"
};

export const FieldContainer: React.SFC<{children: React.ReactNode}> = props => {
  return (
    <div style={style}>
      {props.children}
    </div>
  );
};
