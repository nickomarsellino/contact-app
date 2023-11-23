// ContactCard Component
// --------------------------------------------------------
import styled from "@emotion/styled";
import { Contact } from "../../models";

import { ReactComponent as TrashIcon } from "../../assets/image/trash.svg";
import { ReactComponent as FavoriteIcon } from "../../assets/image/icon-fav.svg";
import { ReactComponent as FavoriteIconActive } from "../../assets/image/icon-fav-active.svg";

interface ContactCardProps {
  itemData?: Contact;
  userFavoriteActive?: boolean;
  onDelete?: () => void;
}

type actionButtonProps = {
  noHover?: boolean;
  color?: string;
};

const ContactCardComponent = styled("div")`
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

const ContactContent = styled("div")`
  flex-direction: row;
  display: flex;
  align-items: center;
`;

const ContentWrapper = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContactProfile = styled("div")`
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

const ContactName = styled("div")`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const ContactActionButton = styled("div")<actionButtonProps>`
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

const StyledTrashIcon = styled(TrashIcon)`
  path {
    fill: white; /* Change 'white' to the color you want */
  }
`;

// const Icon = styled("div")`
// background-image: url(${TrashIcon});
// `;

const ContactPhone = styled("div")`
  font-size: 14px;
`;

// Functional
const handleOnClick = () => {
  // Handle the click logic here
  console.log("Div clicked!");
};

const ContactCard: React.FC<ContactCardProps> = ({
  itemData,
  userFavoriteActive,
  onDelete,
}) => {
  const userName = itemData
    ? `${itemData.first_name} ${itemData.last_name}`
    : "Unknown";
  const firstLetter = itemData && itemData.first_name.length > 0
    ? `${itemData.first_name.charAt(0)}`
    : "Unknown";
  const userPhone =
    itemData && itemData.phones.length > 0
      ? `${itemData.phones[0].number} ${itemData.phones.length}`
      : null;
  const userPhoneMore =
    itemData && itemData.phones.length > 0 && itemData.phones.length - 1 !== 0
      ? `and ${itemData.phones.length - 1} more`
      : null;
  return (
    <ContactCardComponent>
      <ContentWrapper>
        <ContactContent>
          <ContactActionButton color="none" noHover onClick={handleOnClick}>
            {userFavoriteActive ? <FavoriteIconActive /> : <FavoriteIcon />}
          </ContactActionButton>
          <ContactProfile>
            <p>{firstLetter}</p>
          </ContactProfile>
          <div>
            <ContactName>{userName}</ContactName>
            {userPhone && <ContactPhone>{userPhone} {userPhoneMore}</ContactPhone>}
          </div>
        </ContactContent>
        {/* <ContactActionButton color="rgb(243, 104, 25)"><StyledTrashIcon/></ContactActionButton> */}
        <ContactActionButton onClick={onDelete}>
          <StyledTrashIcon />
        </ContactActionButton>
      </ContentWrapper>
    </ContactCardComponent>
  );
};

export default ContactCard;
