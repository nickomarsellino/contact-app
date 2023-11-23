import { Formik, Field, FieldArray, Form, ErrorMessage } from "formik";
import { useMutation } from "@apollo/client";
import { ADD_CONTACT } from "../../query";
import styled from "@emotion/styled";

interface ContactFormProps {
  contactForm?: string;
}

const Input = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;

  &.phones {
    margin-right: 4px;
    margin-left: 4px;
  }

  input {
    display: block;
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 8px;
    outline: none;
    margin-bottom: 16px;

    &:focus {
      border: solid 1px rgb(0, 170, 91);
    }
  }
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
  font-size: 14px;
  margin-bottom: 4px;
`;

const MultiplePhoneInput = styled.label`
  display: flex;
  align-items: baseline;

  button {
    border-radius: 50%;
    width: 24px;
    height: 24px;
    padding: 4px 14px;
  }
`;

const ContactFormComponent = styled("div")`
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 4px;
  padding: 16px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
  transition: transform 0.3s ease;
  max-width: 50%;
  margin: auto;
  @media (max-width: 1024px) {
    max-width: initial;
  }
`;

const ButtonType = styled.button`
  background-color: rgb(0, 170, 91);
  border-color: rgb(0, 170, 91);
  color: white;
  font-weight: 800;
  font-size: 16px;
  padding: 4px 16px;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin-bottom: 8px;
  cursor: pointer;
`;

interface Contact {
  first_name: string;
  last_name: string;
  phones: string[];
}

const initialValues: Contact = {
  first_name: "",
  last_name: "",
  phones: [],
};

const ContactForm = ({ contactForm = "Contact Form" }: ContactFormProps) => {
  const [addContact] = useMutation(ADD_CONTACT);

  const handleSubmit = (values: Contact) => {
    const formData = {
      ...values,
      phones: values.phones.map((phone) => {
        return { number: phone };
      }),
    };
    addContact({ variables: { ...formData } })
      .then(() => {
        alert("Berhasil Add Contact");
      })
      .catch((error) => {
        console.log(error.graphQLErrors[0].message);
      });
    console.log("formData: ", formData);
  };

  return (
    <div>
      {contactForm}
      <ContactFormComponent>
        <Formik
          initialValues={initialValues}
          validationSchema={null}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form>
              <Input>
                <Label htmlFor="first_name">First Name</Label>
                <Field
                  id="first_name"
                  name="first_name"
                  placeholder="First Name"
                />
                <ErrorMessage name="first_name" component="div" />
              </Input>

              <Input>
                <Label htmlFor="last_name">Last Name</Label>
                <Field
                  id="last_name"
                  name="last_name"
                  placeholder="Last Name"
                />
                <ErrorMessage name="last_name" component="div" />
              </Input>

              <div>
                <Label htmlFor="phones">Phones</Label>
                <FieldArray name="phones">
                  {({ push, remove }) => (
                    <div>
                      {values.phones && values.phones.length > 0 ? (
                        <>
                          {values.phones.map((phone, index) => (
                            <MultiplePhoneInput key={index}>
                              <button type="button" onClick={() => push("")}>
                                +
                              </button>
                              {/* <Button
                                textButton="+"
                                type="button"
                                onClickButton={() => remove(index)}
                              /> */}
                              <Input className="phones">
                                <Field
                                  name={`phones.${index}`}
                                  placeholder="Phone Number"
                                />
                              </Input>
                              <button
                                type="button"
                                onClick={() => remove(index)}
                              >
                                x
                              </button>
                              {/* <Button
                                colorButton="red"
                                textButton="x"
                                type="button"
                                onClickButton={() => push("")}
                              /> */}
                            </MultiplePhoneInput>
                          ))}
                        </>
                      ) : (
                        <button type="button" onClick={() => push("")}>
                          Add Phone
                        </button>
                      )}
                    </div>
                  )}
                </FieldArray>
                <ErrorMessage name="phones" component="div" />
              </div>
              <ButtonType type="submit">Submit</ButtonType>
            </Form>
          )}
        </Formik>
      </ContactFormComponent>
    </div>
  );
};

export default ContactForm;
