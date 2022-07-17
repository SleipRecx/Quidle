import React from "react";
import styled from "styled-components";
import {
  color,
  fontSize,
  fontStyle,
  fontWeight,
  layout,
  letterSpacing,
  lineHeight,
  space,
  textAlign,
} from "styled-system";
import { TextBaseProps } from "./types";

export const TextBase = styled.div<TextBaseProps>`
  color: white;
  margin: 0;
  font-weight: 400;
  ${(props) => (props.bold ? `font-weight: 700;` : "")}
  ${(props) => (props.underline ? "text-decoration: underline;" : "")}
  ${(props) => (props.italic ? "font-style: italic" : "")}
  ${color}
  ${layout}
  ${textAlign}
  ${space}
  ${fontWeight}
  ${fontSize}
  ${fontStyle}
  ${lineHeight}
  ${letterSpacing}
`;

const H1Base = styled(TextBase)`
  font-size: 26px;
`;

export const H1 = (props: TextBaseProps) => <H1Base {...props} as="h1" />;

const H2Base = styled(TextBase)`
  font-size: 20px;
`;

export const H2 = (props: TextBaseProps) => <H2Base {...props} as="h2" />;

const H3Base = styled(TextBase)`
  font-size: 18px;
`;
export const H3 = (props: TextBaseProps) => <H3Base {...props} as="h3" />;

const H4Base = styled(TextBase)`
  font-size: 18px;
`;
export const H4 = (props: TextBaseProps) => <H4Base {...props} as="h4" />;
