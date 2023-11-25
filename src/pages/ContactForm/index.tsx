import { Phone } from "../../models";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Formik, Field, FieldArray, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useMutation, useQuery } from "@apollo/client";
import { ADD_CONTACT, GET_DETAIL_CONTACT } from "../../query";
import { Text, Skeleton } from "../../components";
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
  LogoSection,
} from "./styles";

// interface ContactFormProps {
//   contactForm?: string;
// }
interface Contact {
  first_name: string;
  last_name: string;
  phones: Array<Phone>;
}

const initialValues: Contact = {
  first_name: "",
  last_name: "",
  phones: [],
};

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required('First Name is required'),
  phones: Yup.array()
  .of(Yup.number().required('Phone number is required'))
  .min(1, 'At least one phone number is required'),
});


// const ContactForm = ({ contactForm = "Contact App Form" }: ContactFormProps) => {
const ContactForm = (props: any) => {
  const [titlePage, setTitlePage] = useState<string>("Add New Contact Form");
  const [formValues, setFormValues] = useState(initialValues);
  const [disableAllForm, setDisableAllForm] = useState<boolean>(false);

  const { pageProps } = props;
  const { id } = useParams();
  const [errorFromQuery, setErrorFromQuery] = useState<string>("");
  const [addContact] = useMutation(ADD_CONTACT);

  const { loading, data } = useQuery(GET_DETAIL_CONTACT, {
    variables: { id: id },
    skip: !id,
  });

  const handleSubmit = (values: Contact) => {
    const formData = {
      ...values,
      phones: values.phones.map((phone) => {
        return { number: phone };
      }),
    };
    addContact({ variables: { ...formData } })
      .then(() => {
        window.location.href = "/";
      })
      .catch((error) => {
        if (error.graphQLErrors[0].message) {
          setErrorFromQuery(error.graphQLErrors[0].message);
        }
      });
  };

  // useEffect(() => {
  //   if(pageProps && pageProps.type === 'edit'){
  //     refetch(({ variables: { id: id } }))
  //     console.log('data: ', data);
  //   }
  // }, []);

  useEffect(() => {
    if (!loading && data) {
      if (pageProps && pageProps.type === "edit") {
        setTitlePage("Detail Contact");
        setDisableAllForm(true);
        setFormValues({
          first_name: data.contact_by_pk.first_name || "",
          last_name: data.contact_by_pk.last_name || "",
          phones: data.contact_by_pk.phones || Array<Phone>,
        });
      }
    }
  }, [loading, data, pageProps]);

  // useEffect(() => {

  // }, []);

  return (
    <div>
      <ContactFormComponent>
        <LogoSection>
          <Logo />
        </LogoSection>
        <Text>{titlePage}</Text>
        <Formik
          enableReinitialize
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, dirty, isValid }) => {
            const isSubmitDisabled = !isValid || !dirty || disableAllForm;
            return (
              <Form>
                <Input>
                  <Label htmlFor="first_name">First Name</Label>
                  {loading ? (
                    <Skeleton />
                  ) : (
                    <Field
                      disabled={disableAllForm}
                      id="first_name"
                      name="first_name"
                      placeholder="First Name"
                    />
                  )}
                  <ErrorMessage className="error-msg" name="first_name" component="div" />
                </Input>

                <Input>
                  <Label htmlFor="last_name">Last Name</Label>
                  {loading ? (
                    <Skeleton />
                  ) : (
                    <Field
                      disabled={disableAllForm}
                      id="last_name"
                      name="last_name"
                      placeholder="Last Name"
                    />
                  )}
                  <ErrorMessage className="error-msg" name="last_name" component="div" />
                </Input>

                <div>
                  <Label htmlFor="phones">Phones</Label>
                  {loading ? (
                    <Skeleton />
                  ) : (
                    <FieldArray name="phones">
                      {({ push, remove }) => (
                        <div>
                          {values.phones && values.phones.length > 0 ? (
                            <>
                              {values.phones.map((phone, index) => (
                                <MultiplePhoneInput key={index}>
                                  <IconButton
                                    disabled={disableAllForm}
                                    className="bg-green"
                                    type="button"
                                    onClick={() => push("")}
                                  >
                                    <IconAdd />
                                  </IconButton>
                                  <Input className="phones">
                                    <Field
                                      disabled={disableAllForm}
                                      value={phone.number}
                                      name={`phones.${index}`}
                                      placeholder="Phone Number"
                                    />
                                  </Input>
                                  <IconButton
                                    disabled={disableAllForm}
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
                              disabled={disableAllForm}
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
                  )}
                  <ErrorMessage className="error-msg" name="phones" component="div" />
                </div>
                {errorFromQuery && (
                  <ErrorFromQuery>{errorFromQuery}</ErrorFromQuery>
                )}
                {!disableAllForm && (
                  <ButtonSection>
                    <Button disabled={isSubmitDisabled} type="submit">Submit</Button>
                  </ButtonSection>
                )}
              </Form>
            );
          }}
        </Formik>
      </ContactFormComponent>
    </div>
  );
};

export default ContactForm;
