import React from "react";
import styles from "./Container.module.css";

type PropTypes = {
  children: React.ReactNode;
  center?: boolean | null;
  style?: any;
  onClick?: any;
};

const Container: React.FC<PropTypes> = ({
  children,
  center,
  onClick,
  style,
  ...rest
}: PropTypes) => {
  return (
    <div
      onClick={onClick}
      className={[styles.Container, center && styles.center].join(" ")}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Container;
