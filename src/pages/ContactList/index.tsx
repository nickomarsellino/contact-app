import { useState, useEffect } from "react";
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

const getFavoriteListFromStorage = () => {
  let data = localStorage.getItem('favoriteList');
  if(data) data = JSON.parse(data);
  return data as unknown as number[] || [];
}

const saveFavoriteListToStorage = (data: number[]) => {
  localStorage.setItem('favoriteList', JSON.stringify(data));
}

const ContactList = ({
  contactList = "contact-list-compnent",
}: ContactListProps) => {

  const [storageFavoriteList, setStorageFavoriteList] = useState<number[]>([]);
  const { loading, error, data } = useQuery(GET_LIST_CONTACT);
  const [deleteContact] = useMutation(DELETE_CONTACT, {
    refetchQueries: [GET_LIST_CONTACT],
  });

  const toggleFavoriteData = (id: number) => {
    const data = getFavoriteListFromStorage()
  
    if(data.includes(id)) {
      const newData = data.filter(d => d !== id);
      saveFavoriteListToStorage(newData);
      setStorageFavoriteList(newData);
      return
    }
    data.push(id);
    setStorageFavoriteList(data)
    saveFavoriteListToStorage(data);
  }

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

  const onClickFavoriteContact = (id: number) => {
    toggleFavoriteData(id)
  };


  useEffect(() => {
    setStorageFavoriteList(getFavoriteListFromStorage());
  }, []);

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
          favoriteList={storageFavoriteList}
          listData={data.contact}
          handleClickDelete={onClickDeleteContact}
          handleClickFavorite={onClickFavoriteContact}
        />
      </div>
    </div>
  );
};

export default ContactList;
