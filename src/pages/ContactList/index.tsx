import {
  Button,
  ContactList as ContactListComponent,
  InputSearch,
} from "../../components";

interface ContactListProps {
  contactList?: string;
}

const ContactList = ({
  contactList = "contact-list-compnent",
}: ContactListProps) => {
  return (
    <div>
      {contactList}
      <Button textButton="Add Contact" />
      {/* <Button colorButton="red" textButton="Delete Contact"/> */}
      <InputSearch />
      <div>
        <ContactListComponent />
      </div>
    </div>
  );
};

export default ContactList;
