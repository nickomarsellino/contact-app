import styled from "@emotion/styled";
import { ReactComponent as TrashIcon } from "../../assets/image/trash.svg";

type actionButtonProps = {
    noHover?: boolean;
    color?: string;
    onClick?: () => void;
  };


// Wrapper List
export const ContactlistComponent = styled("div")`
display: grid;
grid-template-columns: repeat(2, calc(50% - 12px));
grid-template-rows: repeat(1, 100px);
gap: 16px;

@media (max-width: 1024px) {
  grid-template-columns: repeat(2, calc(50% - 12px));
  grid-template-rows: repeat(1, 100px);
}
@media (max-width: 768px) {
  grid-template-columns: repeat(1, calc(100% - 12px));
  grid-template-rows: repeat(1, 100px);
}
`;

// Contact Card
export const ContactCardComponent = styled("div")`
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 4px;
  padding: 16px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
  transition: transform 0.3s ease;

  &:hover {
    cursor: pointer;
    transform: translateY(-4px);
  }
`;

export const ContactContent = styled("div")`
  flex-direction: row;
  display: flex;
  align-items: center;
`;

export const ContentWrapper = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ContactProfile = styled("div")`
  color: white;
  width: 48px;
  height: 48px;
  background-color: rgb(0, 170, 91);
  text-transform: capitalize;
  font-size: 32px;
  font-weight: bold;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;

export const ContactName = styled("div")`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
`;

export const ContactActionButton = styled("div")<actionButtonProps>`
  background-color: ${(props) =>
    props.color ? props.color : "rgb(224, 41, 84)"};
  width: 24px;
  height: 24px;
  border-radius: 8px;
  padding: 4px;

  &:hover {
    background-color: ${(props) =>
      props.noHover ? props.noHover : "rgb(197, 36, 73);"};
  }
`;

export const StyledTrashIcon = styled(TrashIcon)`
  path {
    fill: white; /* Change 'white' to the color you want */
  }
`;

export const ContactPhone = styled("div")`
  font-size: 14px;
  color: rgb(109, 117, 136);
`;
