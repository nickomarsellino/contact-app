import {
  Button,
  ContactList as ContactListComponent,
  InputSearch,
} from "../../components";

interface ContactListProps {
  contactList?: string;
}


const onClickButton = () => {
  window.location.href = '/contact/add';
}

const ContactList = ({
  contactList = "contact-list-compnent",
}: ContactListProps) => {
  return (
    <div>
      {contactList}
      <Button textButton="Add Contact" onClickButton={onClickButton}/>
      {/* <Button colorButton="red" textButton="Delete Contact"/> */}
      <InputSearch />
      <div>
        <ContactListComponent />
      </div>
    </div>
  );
};

export default ContactList;
