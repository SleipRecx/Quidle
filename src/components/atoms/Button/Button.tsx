import React from "react";
import styles from "./Button.module.css";
import { ButtonProps } from "./types";

const Button = ({ onClick, children, style }: ButtonProps) => {
  return (
    <button className={styles.Button} style={style} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
