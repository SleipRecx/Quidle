import React from "react";

import {
  ColorProps,
  LayoutProps,
  TextAlignProps,
  SpaceProps,
  FontSizeProps,
  FontStyleProps,
  FontWeightProps,
  LineHeightProps,
  LetterSpacingProps,
} from "styled-system";

export type TextBaseProps = React.HTMLAttributes<HTMLHeadingElement> &
  ColorProps &
  LayoutProps &
  TextAlignProps &
  FontSizeProps &
  FontStyleProps &
  FontWeightProps &
  LineHeightProps &
  LetterSpacingProps &
  SpaceProps & {
    underline?: boolean;
    secondary?: boolean;
    extraBold?: boolean;
    heavy?: boolean;
    bold?: boolean;
    italic?: boolean;
    semiBold?: boolean;
    medium?: boolean;
    regular?: boolean;
    light?: boolean;
    thin?: boolean;
    ultraThin?: boolean;
    romanItalic?: boolean;
  };
