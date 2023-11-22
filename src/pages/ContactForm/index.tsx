import { ContactList as ContactListComponent } from "../../components";

interface ContactFormProps {
  contactForm?: string;
}

const ContactForm = ({ contactForm = "Contact Form" }: ContactFormProps) => {
  return (
    <div>
      {contactForm}
      <div>
        <ContactListComponent />
      </div>
    </div>
  );
};

export default ContactForm;
