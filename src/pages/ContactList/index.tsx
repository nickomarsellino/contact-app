import { Button, ContactCard } from "../../components";

interface ContactListProps {
  contactList?: string;
}

const ContactList = ({ contactList = "contact-list-compnent" }: ContactListProps) => {
  return( <div>
    {contactList} 
  <Button textButton="Add New Contact"/>
  <ContactCard />
  <ContactCard />
  <ContactCard />
  <ContactCard />
  <ContactCard />
  <ContactCard />
  <ContactCard />
  <ContactCard />
  <ContactCard />
  <ContactCard />
  <ContactCard />
  <ContactCard />
  <ContactCard />
  <ContactCard />
  </div>);
};

export default ContactList;
