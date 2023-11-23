// ContactList Component
// --------------------------------------------------------
import styled from "@emotion/styled";
import { ContactCard } from "../../components";

interface ContactListProps {
  listData?: Array<string>;
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

const ContactList: React.FC<ContactListProps> = ({ listData }) => {
  return (
    <ContactlistComponent>
      <>
        {listData?.map((item) => (
          <ContactCard userFavoriteActive />
        ))}
      </>
    </ContactlistComponent>
  );
};

export default ContactList;
