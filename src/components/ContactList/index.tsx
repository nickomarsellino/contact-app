// ContactList Component
// --------------------------------------------------------
import styled from "@emotion/styled";
import { ContactCard } from "../../components";

interface ContactListProps {
  userName?: string;
  userPhoneNumber?: string;
}

const ContactlistComponent = styled("div")`
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

const ContactList = ({
  userName = "Ini Name",
  userPhoneNumber = "0812-3445-4443",
}: ContactListProps) => {
  return (
    <ContactlistComponent>
      <ContactCard userName="Contact 1" userPhoneNumber="083243242332" />
      <ContactCard userName="Contact 2" userPhoneNumber="083243242332" />
      <ContactCard userName="Contact 3" userPhoneNumber="083243242332" />
      <ContactCard userName="Contact 4" userPhoneNumber="083243242332" />
      <ContactCard userName="Contact 5" userPhoneNumber="083243242332" />
      <ContactCard userName="Contact 6" userPhoneNumber="083243242332" />
      <ContactCard userName="Contact 7" userPhoneNumber="083243242332" />
      <ContactCard userName="Contact 8" userPhoneNumber="083243242332" />
      <ContactCard userName="Contact 9" userPhoneNumber="083243242332" />
      <ContactCard userName="Contact 10" userPhoneNumber="083243242332" />
      <ContactCard userName="Contact 11" userPhoneNumber="083243242332" />
      <ContactCard userName="Contact 12" userPhoneNumber="083243242332" />
      <ContactCard userName="Contact 13" userPhoneNumber="083243242332" />
      <ContactCard userName="Contact 14" userPhoneNumber="083243242332" />
    </ContactlistComponent>
  );
};

export default ContactList;
