import styled from "@emotion/styled";

export const Input = styled.input`
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  width: 100%;
  margin-bottom: 8px;
  padding-right: 4px;
  @media (min-width: 768px) {
    // max-width: 40%;
  }

  &:focus {
    border: solid 1px rgb(0, 170, 91);
  }
`;

export const SearchSection = styled("div")`
  display: flex;
  button {
    margin-left: 4px;
  }
`;

export const RadioButtonSection = styled("div")`
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  align-items: center;
  margin-bottom: 20px;

  label {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 16px;
  }

  label {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 16px;

    input[type="radio"] {
      margin: 0;
      margin-right: 10px;
    }
  }
`;
