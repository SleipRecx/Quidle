import React from "react";
import Loading from "react-loading";
import { Column } from "../layout";
import styles from "./Button.module.css";
import { ButtonProps } from "./types";

const SimpleButton = ({ onClick, children, style, loading }: ButtonProps) => {
  // TODO: change to react spinner, this one is buggy
  return (
    <button className={styles.SimpleButton} style={style} onClick={onClick}>
      {loading ? (
        <Column center height={85}>
          <Loading color="white" type="spin" width={20} />
        </Column>
      ) : (
        children
      )}
    </button>
  );
};

export default SimpleButton;
