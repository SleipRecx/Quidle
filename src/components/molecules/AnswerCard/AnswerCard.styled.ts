import styled from "styled-components";
export const StyledAnswerCard = styled.div<{
  isCorrect: boolean;
  isWrong: boolean;
}>`
  border: 1px solid #3a3a3c;
  padding: 8px;
  margin-bottom: 8px;
  &:hover {
    background-color: black;
    cursor: pointer;
  }
  &:active {
    cursor: pointer;
  }
  border-color: ${(p) =>
    p.isCorrect ? "green" : p.isWrong ? "red" : "#3a3a3c"};
`;
