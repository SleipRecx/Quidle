import React from "react";
import styles from "./Input.module.css";
import { InputProps } from "./types";

const Input = ({ placeholder, onChangeText, value }: InputProps) => {
  return (
    <input
      className={styles.Input}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChangeText(e.target.value)}
    />
  );
};

export default Input;
