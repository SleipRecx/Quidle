import styled from "styled-components";
export const StyledAnswerCard = styled.div<{
  isCorrect: boolean;
  isWrong: boolean;
}>`
  box-sizing: border-box;
  width: 100%;
  padding: 8px;
  margin-bottom: 8px;
  &:hover {
    background-color: black;
    cursor: pointer;
  }
  &:active {
    cursor: pointer;
  }

  background: ${(p) =>
    p.isCorrect ? "#00ff00" : p.isWrong ? "#ff0033" : "#3a3a3c"};
`;
