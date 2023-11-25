import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_LIST_CONTACT, DELETE_CONTACT } from "../../query";
import { SectionActionButton, LogoSection } from "./styles";
import { ReactComponent as Logo } from "../../assets/image/tokopedia-logo.svg";

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

const getCountFavoriteListFromStorage = () => {
  let data = localStorage.getItem("favoriteList");
  if (data) data = JSON.parse(data);
  return (data?.length as unknown as number) || 0;
};

const saveFavoriteListToStorage = (data: number[]) => {
  localStorage.setItem("favoriteList", JSON.stringify(data));
};

const getTotalPage = (totalData: number, totalFavorite: number) => {
  const calculation = totalData - totalFavorite;
  const calculate = calculation / limitDataPage;
  return Math.floor(calculate);
};

const ContactList = ({ contactList = "Contact Apps" }: ContactListProps) => {
  const [storageFavoriteList, setStorageFavoriteList] = useState<number[]>([]);

  // Handle Pagination
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [offsetPage, setOffsetPage] = useState<number>(0);

  // State Button Pagination
  const [disabledNextButton, setDisabledNextButton] = useState<boolean>(false);
  const [disabledPrevButton, setDisabledPrevButton] = useState<boolean>(true);

  // Handle Search
  const [valueSearch, setValueSearch] = useState<string>("");
  const [valueCategorySearch, setValueCategorySearch] = useState<string>("");

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

  const onClickDetail = (id: number) => {
    window.location.href = `/contact/edit/${id}`;
  };

  const onClickDeleteContact = (id: number) => {
    deleteContact({ variables: { id: id } })
      .then(() => {
        refetch({
          variables: { ...getData },
        });
      })
      .catch(() => {
        alert("Gagal Delete Contact");
      });
  };

  const onClickFavoriteContact = (id: number) => {
    toggleFavoriteData(id);
  };

  const onClickNextPage = () => {
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

  const handleGetSearchValue = () => {
    console.log("valueSearch: ", valueSearch);
    console.log("valueCategorySearch: ", valueCategorySearch);
  };

  useEffect(() => {
    setStorageFavoriteList(getFavoriteListFromStorage());
  }, []);

  useEffect(() => {
    if (!loading && data) {
      const totalFavorite = getCountFavoriteListFromStorage();
      const totalDataQuery = data.contact_aggregate.aggregate.count;
      const total = getTotalPage(
        data.contact_aggregate.aggregate.count,
        totalFavorite
      );
      if (totalDataQuery - totalFavorite < limitDataPage) {
        setDisabledNextButton(true);
        setTotalPage(1);
      } else {
        setTotalPage(total);
      }
    }
  }, [loading, data]);

  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <LogoSection>
        <Logo />
      </LogoSection>
      <InputSearch setValueSearch={setValueSearch} setValueCategorySearch={setValueCategorySearch} handleGetSearchValue={handleGetSearchValue}/>
      <Text>{contactList}</Text>
      <SectionActionButton>
        <Button textButton="Add New Contact" onClickButton={onClickButton} />
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
      {!loading && data.contactFavorite.length > 0 && (
        <div>
          <Text>Favorite Contact</Text>
          <ContactListComponent
            isLoading={loading}
            favoriteList={storageFavoriteList}
            listData={!loading && data.contactFavorite && data.contactFavorite}
            handleClickDelete={onClickDeleteContact}
            handleClickFavorite={onClickFavoriteContact}
            onClickDetail={onClickDetail}
          />
        </div>
      )}
      <div>
        <Text>Regular Contact</Text>
        <ContactListComponent
          isLoading={loading}
          favoriteList={storageFavoriteList}
          listData={!loading && data.contact && data.contact}
          handleClickDelete={onClickDeleteContact}
          handleClickFavorite={onClickFavoriteContact}
          onClickDetail={onClickDetail}
        />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        disableNextButton={disabledNextButton}
        disablePrevButton={disabledPrevButton}
        handleClickNext={onClickNextPage}
        handleClickPrev={onClickBackPage}
      />
    </div>
  );
};

export default ContactList;
