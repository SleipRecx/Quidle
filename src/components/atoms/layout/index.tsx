import Loading from "react-loading";
import styled from "styled-components";
import {
  background,
  border,
  boxShadow,
  color,
  flexbox,
  layout,
  position,
  space,
} from "styled-system";
import { BaseLayoutProps } from "./types";

export const BaseLayout = styled.div<BaseLayoutProps>`
  ${(props) => (props.fullWidth ? "width: 100%;" : "")}
  ${(props) => (props.fullHeight ? "height: 100%;" : "")}
  ${(props) => (props.transition ? `transition: ${props.transition};` : "")}
  ${(props) =>
    props.transitionDelay ? `transition-delay: ${props.transitionDelay};` : ""}
  ${(props) => (props.transform ? `transform: ${props.transform};` : "")}
  ${(props) =>
    props.center ? "align-items: center; justify-content: center;" : ""}
  ${(props) => (props.wrap ? "align-self: flex-start;" : "")}
  ${(props) => (props.shadow ? `box-shadow: 0px 3px 3px #747474;` : "")}
  ${(props) =>
    props.borderPadding
      ? `padding: 0 ${props.theme.space.borderPadding}px`
      : ""}
  cursor: ${(props) => props.cursor || "auto"};
  &::-webkit-scrollbar {
    width: ${(props) => props.scrollbarWidth || ""};
  }
  transform: ${(props) => (props.rotate ? `rotate(${props.rotate}deg)` : "")};
  ${color}
  ${layout}
  ${space}
  ${border}
  ${position}
  ${boxShadow}
  ${flexbox}
  ${background}
`;

export const Column = styled(BaseLayout)`
  display: flex;
  flex-direction: column;
`;

export type Props = BaseLayoutProps & {
  loading: boolean;
};

export const LoadingColumn = (props: Props) =>
  props.loading ? (
    <Column {...props}>
      <Column height="100%" width="100%" center>
        <Loading type="bars" color="white" width={48} />
      </Column>
    </Column>
  ) : (
    <Column {...props}>{props.children}</Column>
  );

export const Row = styled(BaseLayout)`
  display: flex;
  flex-direction: row;
`;

export const FlexContainer = styled(BaseLayout)`
  display: flex;
`;

export const Float = styled(BaseLayout)`
  position: absolute;
`;

export const DefaultWrapper = styled(BaseLayout)`
  display: flex;
  flex-direction: column;
`;
