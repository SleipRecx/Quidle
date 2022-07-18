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
  border: ${(p) =>
    p.isCorrect
      ? "3px solid #00ff00"
      : p.isWrong
      ? "2px solid #ff0033"
      : "1px solid #3a3a3c"};
`;
