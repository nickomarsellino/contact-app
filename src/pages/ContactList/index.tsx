import { useQuery, gql } from "@apollo/client";

import {
  Button,
  ContactList as ContactListComponent,
  InputSearch,
} from "../../components";

interface ContactListProps {
  contactList?: string;
}

// Add New Data
const GET_LIST_CONTACT = gql`
  query GetContactList(
    $distinct_on: [contact_select_column!]
    $limit: Int
    $offset: Int
    $order_by: [contact_order_by!]
    $where: contact_bool_exp
  ) {
    contact(
      distinct_on: $distinct_on
      limit: $limit
      offset: $offset
      order_by: $order_by
      where: $where
    ) {
      created_at
      first_name
      id
      last_name
      phones {
        number
      }
    }
  }
`;


const onClickButton = () => {
  window.location.href = "/contact/add";
};

const ContactList = ({
  contactList = "contact-list-compnent",
}: ContactListProps) => {
  const { loading, error, data } = useQuery(GET_LIST_CONTACT);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      {contactList}
      <Button textButton="Add Contact" onClickButton={onClickButton} />
      {/* <Button colorButton="red" textButton="Delete Contact"/> */}
      <InputSearch />
      <div>
        <ContactListComponent listData={data.contact}/>
      </div>
    </div>
  );
};

export default ContactList;
