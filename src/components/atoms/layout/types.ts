import {
  ColorProps,
  LayoutProps,
  SpaceProps,
  BorderProps,
  PositionProps,
  BoxShadowProps,
  FlexboxProps,
  BackgroundProps,
} from "styled-system";

type CustomBaseLayoutProps = {
  fullWidth?: boolean;
  fullHeight?: boolean;
  wrap?: boolean;
  center?: boolean;
  shadow?: boolean;
  transition?: string;
  transitionDelay?: string;
  transform?: string;
  borderPadding?: boolean;
  cursor?: React.CSSProperties["cursor"];
  scrollbarWidth?: number | string;
  rotate?: number;
};

export type BaseLayoutProps = React.HTMLAttributes<HTMLDivElement> &
  CustomBaseLayoutProps &
  ColorProps &
  LayoutProps &
  SpaceProps &
  BorderProps &
  PositionProps &
  BoxShadowProps &
  BackgroundProps &
  FlexboxProps;
