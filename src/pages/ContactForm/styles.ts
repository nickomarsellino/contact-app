import styled from "@emotion/styled";

export const Input = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;

  input {
    display: block;
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 8px;
    outline: none;
    margin-bottom: 16px;

    &:focus {
      border: solid 1px rgb(0, 170, 91);
    }
  }

  &.phones {
    margin-right: 4px;
    margin-left: 4px;
    input {
      margin-bottom: 0;
    }
  }
`;

export const Label = styled.label`
  font-weight: bold;
  display: block;
  font-size: 14px;
  margin-bottom: 4px;
`;

export const MultiplePhoneInput = styled.label`
  display: flex;
  margin-bottom: 16px;
`;

export const ContactFormComponent = styled("div")`
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 4px;
  padding: 16px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
  transition: transform 0.3s ease;
  max-width: 50%;
  margin: auto;
  margin-top: 88px;
  @media (max-width: 1024px) {
    max-width: initial;
  }

  .skeleton{
    height: 30px !important;
    margin-bottom: 16px 
  }
`;

export const ButtonSection = styled("div")`
  display: flex;
  flex-direction: row-reverse;
  button {
    margin-bottom: 0px;
  }
`;
export const Button = styled.button`
  background-color: rgb(0, 170, 91);
  border-color: rgb(0, 170, 91);
  color: white;
  font-weight: 800;
  font-size: 16px;
  padding: 4px 16px;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin-top: 16px;
  margin-bottom: 8px;
  cursor: pointer;


  &:disabled {
    cursor: initial;
    color: black;
    background-color: rgb(228, 235, 245);
  }
`;

export const IconButton = styled.button`
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;

  &:disabled {
    background-color: black;
  }

  p {
    margin-left: 4px;
    font-weight: bold;
    color: white;
    margin-top: 0px;
    margin-bottom: 0px;
  }

  path {
    fill: white; /* Change 'white' to the color you want */
  }

  &.disabled {
    background-color: rgb(228, 235, 245);

    path {
      fill: rgb(170, 180, 200);
    }
  }

  &.bg-red {
    background-color: rgb(224, 41, 84);
    border-color: rgb(224, 41, 84);

    &:hover {
      background-color: rgb(193, 38, 74);
    }
  }
  &.bg-green {
    background-color: rgb(0, 170, 91);
    border-color: rgb(0, 170, 91);

    &:hover {
      background-color: rgb(2, 146, 79);
    }
  }
`;

export const ErrorFromQuery = styled.p`
  color: rgb(193, 38, 74);
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 4px;
`;

export const LogoSection = styled("div")`
  text-align: center;
`;
