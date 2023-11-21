// Button Component
// --------------------------------------------------------
import styled from '@emotion/styled'
import { css } from '@emotion/react'

interface ButtonProps {
  textButton?: string;
}

const greenColor = css`
  background-color: rgb(0, 170, 91);
  border-color: rgb(0, 170, 91);
  color: white;
`

const ButtonType = styled.button`
  ${greenColor};
  font-weight: 800;
  font-size: 16px;
  padding: 4px 16px;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`


const Button = ({ textButton = '' }: ButtonProps) => {
  return <ButtonType>{textButton}</ButtonType>;
};

export default Button;