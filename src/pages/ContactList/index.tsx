import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_LIST_CONTACT, DELETE_CONTACT } from "../../query";
import { SectionActionButton } from "./styles";

import {
  Button,
  ContactList as ContactListComponent,
  Pagination,
  InputSearch,
  Text,
} from "../../components";

interface ContactListProps {
  contactList?: string;
}

const limitDataPage = 10;

const getFavoriteListFromStorage = () => {
  let data = localStorage.getItem("favoriteList");
  if (data) data = JSON.parse(data);
  return (data as unknown as number[]) || [];
};

const saveFavoriteListToStorage = (data: number[]) => {
  localStorage.setItem("favoriteList", JSON.stringify(data));
};

const getTotalPage = (totalData: number) => {
  const calculate = totalData / limitDataPage;
  return Math.floor(calculate);
};

const ContactList = ({
  contactList = "contact-list-compnent",
}: ContactListProps) => {
  const [storageFavoriteList, setStorageFavoriteList] = useState<number[]>([]);

  // Handle Pagination
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [offsetPage, setOffsetPage] = useState<number>(0);

  // State Button Pagination
  const [disabledNextButton, setDisabledNextButton] = useState<boolean>(false);
  const [disabledPrevButton, setDisabledPrevButton] = useState<boolean>(true);

  const getData = {
    whereFavoriteList: {
      id: {
        _in: storageFavoriteList,
      },
    },
    where: {
      id: {
        _nin: storageFavoriteList,
      },
    },
    order_by: [{ created_at: "desc" }],
    limit: limitDataPage,
    offset: offsetPage,
  };

  const { loading, error, data, refetch } = useQuery(GET_LIST_CONTACT, {
    variables: { ...getData },
  });
  const [deleteContact] = useMutation(DELETE_CONTACT, {
    refetchQueries: [GET_LIST_CONTACT],
  });

  const toggleFavoriteData = (id: number) => {
    const data = getFavoriteListFromStorage();

    if (data.includes(id)) {
      const newData = data.filter((d) => d !== id);
      saveFavoriteListToStorage(newData);
      setStorageFavoriteList(newData);
      refetch({
        variables: { ...getData },
      });
      return;
    }
    data.push(id);
    setStorageFavoriteList(data);
    saveFavoriteListToStorage(data);
    refetch({
      variables: { ...getData },
    });
  };

  const onClickButton = () => {
    window.location.href = "/contact/add";
  };

  const onClickDeleteContact = (id: number) => {
    deleteContact({ variables: { id: id } })
      .then(() => {
        alert("Berhasil Delete Contact");
      })
      .catch(() => {
        alert("Gagal Delete Contact");
      });
  };

  const onClickFavoriteContact = (id: number) => {
    toggleFavoriteData(id);
  };

  const onClickNextPage = () => {
    console.log("onClickNextPage: ");
    const currentPagination = currentPage + 1;
    const currentOffset = currentPagination * limitDataPage;
    if (currentPagination === totalPage) {
      setDisabledNextButton(true);
      setDisabledPrevButton(false);
    } else {
      setDisabledPrevButton(false);
    }
    setCurrentPage(currentPagination);
    setOffsetPage(currentOffset);
  };

  const onClickBackPage = () => {
    console.log("onClickBackPage: ");
    const currentPagination = currentPage - 1;
    const currentOffset = offsetPage - limitDataPage;
    if (currentPagination < 0 || currentPagination === 0) {
      setDisabledPrevButton(true);
      setDisabledNextButton(false);
    } else {
      setDisabledNextButton(false);
    }
    setCurrentPage(currentPagination);
    setOffsetPage(currentOffset);
  };

  useEffect(() => {
    setStorageFavoriteList(getFavoriteListFromStorage());
  }, []);

  useEffect(() => {
    if (!loading && data) {
      const total = getTotalPage(data.contact_aggregate.aggregate.count);
      if (data.contact_aggregate.aggregate.count < limitDataPage) {
        setDisabledNextButton(true);
        setTotalPage(1);
      } else {
        setTotalPage(total);
      }
    }
  }, [loading, data]);

  console.log("data: ", data);

  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      {contactList}
      <InputSearch />
      <SectionActionButton>
        <Button textButton="Add Contact" onClickButton={onClickButton} />
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          disableNextButton={disabledNextButton}
          disablePrevButton={disabledPrevButton}
          handleClickNext={onClickNextPage}
          handleClickPrev={onClickBackPage}
        />
      </SectionActionButton>
      {/* <Button
        disabled={disabledNextButton}
        textButton="Next"
        onClickButton={onClickNextPage}
      />
      <Button
        disabled={disabledPrevButton}
        textButton="Prev"
        onClickButton={onClickBackPage}
      /> */} 
      <div>
        <Text>Favorite Contact</Text>
        <ContactListComponent
          isLoading={loading}
          favoriteList={storageFavoriteList}
          listData={(!loading && data.contactFavorite) && data.contactFavorite}
          handleClickDelete={onClickDeleteContact}
          handleClickFavorite={onClickFavoriteContact}
        />
      </div>
      <div>
        <Text>Regular Contact</Text>
        <ContactListComponent
          isLoading={loading}
          favoriteList={storageFavoriteList}
          listData={(!loading && data.contact) && data.contact}
          handleClickDelete={onClickDeleteContact}
          handleClickFavorite={onClickFavoriteContact}
        />
      </div>
    </div>
  );
};

export default ContactList;
