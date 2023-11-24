// Button Component
// --------------------------------------------------------
import styled from "@emotion/styled";
import { MouseEventHandler } from "react";
import { css } from "@emotion/react";

interface ButtonProps {
  type?: string;
  textButton?: string;
  colorButton?: string;
  disabled?: boolean;
  onClickButton?: MouseEventHandler<HTMLButtonElement>;
}

const greenColor = css`
  background-color: rgb(0, 170, 91);
  border-color: rgb(0, 170, 91);
  color: white;
`;

const redColor = css`
  background-color: rgb(224, 41, 84);
  border-color: rgb(224, 41, 84);
  color: white;
`;

const ButtonType = styled.button<ButtonProps>`
  ${(props) => (props.colorButton === "red" ? redColor : greenColor)};
  font-weight: 800;
  font-size: 16px;
  padding: 4px 16px;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin-bottom: 8px;
  cursor: pointer;
`;

const Button: React.FC<ButtonProps> = ({
  textButton,
  disabled,
  type,
  onClickButton,
}) => {
  return <ButtonType disabled={disabled} onClick={onClickButton}>{textButton}</ButtonType>;
};

export default Button;
