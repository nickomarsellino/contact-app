import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_LIST_CONTACT,
  DELETE_CONTACT,
  GET_SEARCH_FIRST_NAME,
} from "../../query";
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
  const [dataContact, setDataContact] = useState<any>({});
  const [dataContactFavorite, setDataContactFavorite] = useState<any>({});
  const [storageFavoriteList, setStorageFavoriteList] = useState<number[]>([]);

  // Handle Pagination
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [offsetPage, setOffsetPage] = useState<number>(0);

  // State Button Pagination
  const [disabledNextButton, setDisabledNextButton] = useState<boolean>(false);
  const [disabledPrevButton, setDisabledPrevButton] = useState<boolean>(true);

  // Handle Search
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [valueSearch, setValueSearch] = useState<string>("");
  const [valueCategorySearch, setValueCategorySearch] = useState<string>("");

  const restructuredDataSearch = (data: any) => {
    console.log("@@@->> data: ", data);
    const restructuredData = data.contact.map(
      (contact: {
        contact: { id: any; first_name: any; last_name: any; phones: any[] };
      }) => {
        return {
          id: contact.contact.id,
          first_name: contact.contact.first_name,
          last_name: contact.contact.last_name,
          phones: contact.contact.phones.map((phone: { number: any }) => {
            return {
              number: phone.number,
            };
          }),
        };
      }
    );
    setDataContact(restructuredData);
  };

  const getDataBySearchCategory = (value: string) => {
    console.log("getDataBySearchCategory: ", valueCategorySearch);

    if(valueCategorySearch === "first_name"){
      const query = {
        where: {
          contact: {
            first_name: {
              _ilike: `%${value}%`,
            },
          },
        },
      };
      return query;
    }

    if(valueCategorySearch === "last_name"){
      const query = {
        where: {
          contact: {
            last_name: {
              _ilike: `%${value}%`,
            },
          },
        },
      };
      return query;
    }

    if(valueCategorySearch === "phones"){
      const query = {
        where: {
          contact: {
            phones: {
              number: {
                _iregex: `${value}`,
              }
            }
          },
        },
      };
      return query;
    }
  };

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
    skip: valueSearch.length > 0,
  });
  const {
    loading: loadingSearch,
    data: dataSearch,
    refetch: refetchSearch,
  } = useQuery(GET_SEARCH_FIRST_NAME, {
    variables: { ...getDataBySearchCategory(valueSearch) },
    skip: !valueSearch,
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
    if (valueSearch.length === 0) {
      refetch({
        variables: { ...getData },
      });
    } else {
      refetchSearch({
        variables: { ...getDataBySearchCategory(valueSearch) },
      });
    }
  };

  useEffect(() => {
    setStorageFavoriteList(getFavoriteListFromStorage());
  }, []);

  useEffect(() => {
    if (!loading && data) {
      console.log("data: ", data);
      setDataContact(data.contact);
      setDataContactFavorite(data.contactFavorite);
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

  useEffect(() => {
    if (!loadingSearch && dataSearch) {
      restructuredDataSearch(dataSearch);
    }
  }, [loadingSearch, dataSearch, valueSearch]);

  useEffect(() => {
    if (valueSearch.length > 0) {
      setSearchActive(true);
    } else {
      setSearchActive(false);
    }
  }, [valueSearch]);


  // useEffect(() => {
  //   console.log(valueCategorySearch);
  // }, [valueCategorySearch]);

  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <LogoSection>
        <Logo />
      </LogoSection>
      <InputSearch
        valueSearch={valueSearch}
        setValueSearch={setValueSearch}
        setValueCategorySearch={setValueCategorySearch}
        handleGetSearchValue={handleGetSearchValue}
      />
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
      {!searchActive && (
        <>
          {!loading && dataContactFavorite.length > 0 && (
            <div>
              <Text>Favorite Contact</Text>
              <ContactListComponent
                isLoading={loading}
                favoriteList={storageFavoriteList}
                listData={
                  !loading && dataContactFavorite && dataContactFavorite
                }
                handleClickDelete={onClickDeleteContact}
                handleClickFavorite={onClickFavoriteContact}
                onClickDetail={onClickDetail}
              />
            </div>
          )}
        </>
      )}
      {!loading && dataContact.length > 0 && (
        <div>
          <Text>Regular Contact</Text>
          <ContactListComponent
            isLoading={loading}
            favoriteList={storageFavoriteList}
            listData={!loading && dataContact && dataContact}
            handleClickDelete={onClickDeleteContact}
            handleClickFavorite={onClickFavoriteContact}
            onClickDetail={onClickDetail}
          />
        </div>
      )}
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
