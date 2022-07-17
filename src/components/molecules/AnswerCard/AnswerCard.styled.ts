import styled from "styled-components";
export const StyledAnswerCard = styled.div<{
  highlighted: boolean;
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
  background-color: ${(p) => (p.highlighted ? "green" : "")};
`;
