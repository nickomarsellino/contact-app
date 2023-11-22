import { InputForm } from "../../components";
import styled from "@emotion/styled";

interface ContactFormProps {
  contactForm?: string;
}

const ContactCardComponent = styled("div")`
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 4px;
  padding: 16px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
  transition: transform 0.3s ease;
`;

const ContactForm = ({ contactForm = "Contact Form" }: ContactFormProps) => {
  return (
    <div> 
      {contactForm}
      <ContactCardComponent>
        <InputForm label="First Name" placeholder="Input First Name" />
        <InputForm label="Last Name" placeholder="Input Last Name" />
        <InputForm label="Phone Number" placeholder="Phone Number" />
      </ContactCardComponent>
    </div>
  );
};

export default ContactForm;
