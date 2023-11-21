// ContactCard Component
// --------------------------------------------------------
import styled from "@emotion/styled";

interface ButtonProps {
  userName?: string;
  userPhoneNumber?: string;
}

const ContactCardComponent = styled("div")`
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 4px;
  padding: 16px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
`;

const ContactContent = styled("div")`
  flex-direction: row;
  display: flex;
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

const ContactPhone = styled("div")`
  font-size: 14px;
`;

const ContactCard = ({
  userName = "Ini Name",
  userPhoneNumber = "0812-3445-4443",
}: ButtonProps) => {
  return (
    <ContactCardComponent>
      <ContactContent>
        <ContactProfile>
          <p>n</p>
        </ContactProfile>
        <div>
          <ContactName>{userName}</ContactName>
          <ContactPhone>{userPhoneNumber}</ContactPhone>
        </div>
      </ContactContent>
    </ContactCardComponent>
  );
};

export default ContactCard;
