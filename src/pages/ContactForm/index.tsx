import { useState } from "react";
import { Formik, Field, FieldArray, Form, ErrorMessage } from "formik";
import { useMutation } from "@apollo/client";
import { ADD_CONTACT } from "../../query";
import { Text } from "../../components";
import { ReactComponent as IconAdd } from "../../assets/image/add.svg";
import { ReactComponent as IconTrash } from "../../assets/image/trash.svg";
import { ReactComponent as Logo } from "../../assets/image/tokopedia-logo.svg";

import {
  Input,
  Label,
  MultiplePhoneInput,
  ContactFormComponent,
  ButtonSection,
  Button,
  IconButton,
  ErrorFromQuery,
  LogoSection
} from "./styles";

interface ContactFormProps {
  contactForm?: string;
}
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

const ContactForm = ({ contactForm = "Contact App Form" }: ContactFormProps) => {
  const [errorFromQuery, setErrorFromQuery] = useState<string>("");
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
        if (error.graphQLErrors[0].message) {
          setErrorFromQuery(error.graphQLErrors[0].message);
        }
        console.log(error.graphQLErrors[0].message);
      });
    console.log("formData: ", formData);
  };

  return (
    <div>
      <ContactFormComponent>
        <LogoSection>
          <Logo />
        </LogoSection>
        <Text>{contactForm}</Text>
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
                              <IconButton
                                className="bg-green"
                                type="button"
                                onClick={() => push("")}
                              >
                                <IconAdd />
                              </IconButton>
                              <Input className="phones">
                                <Field
                                  name={`phones.${index}`}
                                  placeholder="Phone Number"
                                />
                              </Input>
                              <IconButton
                                className="bg-red"
                                type="button"
                                onClick={() => remove(index)}
                              >
                                <IconTrash />
                              </IconButton>
                            </MultiplePhoneInput>
                          ))}
                        </>
                      ) : (
                        // <button type="button" onClick={() => push("")}>
                        //   Add Phone
                        // </button>
                        <IconButton
                          className="bg-green"
                          type="button"
                          onClick={() => push("")}
                        >
                          <IconAdd /> <p>Add Phone</p>
                        </IconButton>
                      )}
                    </div>
                  )}
                </FieldArray>
                <ErrorMessage name="phones" component="div" />
              </div>
              {errorFromQuery && (
                <ErrorFromQuery>{errorFromQuery}</ErrorFromQuery>
              )}
              <ButtonSection>
                <Button type="submit">Submit</Button>
              </ButtonSection>
            </Form>
          )}
        </Formik>
      </ContactFormComponent>
    </div>
  );
};

export default ContactForm;
