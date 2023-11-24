import styled from "@emotion/styled";

export const Input = styled.input`
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  width: 100%;
  margin-bottom: 16px;
  @media (min-width: 768px) {
    max-width: 40%;
  }

  &:focus {
    border: solid 1px rgb(0, 170, 91);
  }
`;
