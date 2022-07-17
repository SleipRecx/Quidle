import React from "react";
import styles from "./Input.module.css";
import { InputProps } from "./types";

const Input = ({}: InputProps) => {
  return <input className={styles.Input} />;
};

export default Input;
