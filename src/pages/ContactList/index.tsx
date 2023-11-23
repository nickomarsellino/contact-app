import { useQuery, useMutation } from "@apollo/client";
import { GET_LIST_CONTACT, DELETE_CONTACT } from "../../query";

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
  const { loading, error, data } = useQuery(GET_LIST_CONTACT);
  const [deleteContact] = useMutation(DELETE_CONTACT, {
    refetchQueries: [GET_LIST_CONTACT],
  });
  const onClickButton = () => {
    window.location.href = "/contact/add";
  };

  const onClickDeleteContact = (id: number) => {
    console.log("id: ", id);
    deleteContact({ variables: { id: id } })
      .then(() => {
        alert("Berhasil Delete Contact");
      })
      .catch(() => {
        alert("Gagal Delete Contact");
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      {contactList}
      <Button textButton="Add Contact" onClickButton={onClickButton} />
      {/* <Button colorButton="red" textButton="Delete Contact"/> */}
      <InputSearch />
      <div>
        <ContactListComponent
          listData={data.contact}
          handleClickDelete={onClickDeleteContact}
        />
      </div>
    </div>
  );
};

export default ContactList;
