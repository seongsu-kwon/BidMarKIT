import React from "react";
import "css/Button.css";

function Button(props) {
  const { onClick, children } = props;
  return <button onClick={onClick}>{children}</button>;
}

export default Button;
