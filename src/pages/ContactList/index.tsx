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
  const getData = {
    "whereFavoriteList": {
      "id": {
        "_in": storageFavoriteList
      }
    },
    "where": {
      "id": {
        "_nin": storageFavoriteList
      }
    },
    "order_by": [{created_at: "desc"}]
  }

  const {loading, error, data, refetch} = useQuery(GET_LIST_CONTACT,{
    variables: { ...getData },
  });
  const [deleteContact] = useMutation(DELETE_CONTACT, {
    refetchQueries: [GET_LIST_CONTACT],
  });

  const toggleFavoriteData = (id: number) => {
    const data = getFavoriteListFromStorage()
  
    if(data.includes(id)) {
      const newData = data.filter(d => d !== id);
      saveFavoriteListToStorage(newData);
      setStorageFavoriteList(newData);
      refetch({
        variables: { ...getData },
      });
      return
    }
    data.push(id);
    setStorageFavoriteList(data)
    saveFavoriteListToStorage(data);
    refetch({
      variables: { ...getData },
    });
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


  console.log('data: ', data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      {contactList}
      <Button textButton="Add Contact" onClickButton={onClickButton} />
      {/* <Button colorButton="red" textButton="Delete Contact"/> */}
      <InputSearch />
      <div>
        Favorite Contact
        <ContactListComponent
          favoriteList={storageFavoriteList}
          listData={data.contactFavorite && data.contactFavorite}
          handleClickDelete={onClickDeleteContact}
          handleClickFavorite={onClickFavoriteContact}
        />
      </div>
      <div>
        Regular Contact
        <ContactListComponent
          favoriteList={storageFavoriteList}
          listData={data.contact && data.contact}
          handleClickDelete={onClickDeleteContact}
          handleClickFavorite={onClickFavoriteContact}
        />
      </div>
    </div>
  );
};

export default ContactList;
