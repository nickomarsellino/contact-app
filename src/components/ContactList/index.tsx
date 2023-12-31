// ContactList Component
// --------------------------------------------------------
import { Contact, Phone } from "../../models";
import { Skeleton } from "../../components";
import {
  ContactlistComponent,
  ContactCardComponent,
  ContentWrapper,
  ContactContent,
  ContactActionButton,
  ContactProfile,
  ContactName,
  ContactPhone,
  StyledTrashIcon,
} from "./styles";
import { ReactComponent as FavoriteIcon } from "../../assets/image/icon-fav.svg";
import { ReactComponent as FavoriteIconActive } from "../../assets/image/icon-fav-active.svg";

interface ContactListProps {
  isLoading: boolean;
  listData: Array<Contact>;
  favoriteList: number[];
  onClickDetail: (id: number) => void;
  handleClickDelete: (id: number) => void;
  handleClickFavorite: (id: number) => void;
}

const ContactList: React.FC<ContactListProps> = ({
  isLoading,
  listData,
  favoriteList,
  onClickDetail,
  handleClickDelete,
  handleClickFavorite,
}) => {
  const skeletonData = [0, 1, 2, 3, 4];

  const firstLetter = (first_name: string) => {
    const initialFirstName =
      first_name && first_name.length > 0 ? `${first_name.charAt(0)}` : "?";
    return `${initialFirstName}`;
  };
  const handleGetName = (first_name: string, last_name: string) => {
    const userName =
      first_name || last_name ? `${first_name} ${last_name}` : "Unknown";
    return userName;
  };

  const handleGetPhone = (phones: Array<Phone>) => {
    const userPhone =
      phones && phones.length > 0
        ? `${phones[0].number} ${phones.length}`
        : null;
    return userPhone;
  };

  const handleGetMoreList = (phones: Array<Phone>) => {
    const userPhoneMore =
      phones && phones.length > 0 && phones.length - 1 !== 0
        ? `and ${phones.length - 1} more`
        : null;
    return userPhoneMore;
  };

  const handleFavoriteIcon = (id: number) => {
    if (favoriteList.includes(id)) {
      return <FavoriteIconActive />;
    }
    return <FavoriteIcon />;
  };

  return (
    <ContactlistComponent>
      <>
        {isLoading ? (
          <>
            {skeletonData.map((item, index) => (
              <ContactCardComponent key={index}>
                <Skeleton />
              </ContactCardComponent>
            ))}
          </>
        ) : (
          <>
            {listData.map((item, index) => (
              <ContactCardComponent key={index}>
                <ContentWrapper>
                  <ContactContent>
                    <ContactActionButton
                      color="none"
                      noHover
                      onClick={() => handleClickFavorite(item.id)}
                    >
                      {handleFavoriteIcon(item.id)}
                      {/* {userFavoriteActive ? ( */}
                      {/* <FavoriteIconActive /> */}
                      {/* // ) : (
                    <FavoriteIcon />
                  // )} */}
                    </ContactActionButton>
                    <ContactProfile onClick={() => onClickDetail(item.id)}>
                      <p>{firstLetter(item.first_name)}</p>
                    </ContactProfile>
                    <div
                      style={{ paddingRight: "4px" }}
                      onClick={() => onClickDetail(item.id)}
                    >
                      <ContactName>
                        {handleGetName(item.first_name, item.last_name)}
                      </ContactName>
                      {handleGetPhone(item.phones) && (
                        <ContactPhone>
                          {handleGetPhone(item.phones)}{" "}
                          {handleGetMoreList(item.phones)}
                        </ContactPhone>
                      )}
                    </div>
                  </ContactContent>
                  {/* <ContactActionButton color="rgb(243, 104, 25)"><StyledTrashIcon/></ContactActionButton> */}
                  <ContactActionButton
                    onClick={() => handleClickDelete(item.id)}
                  >
                    <StyledTrashIcon />
                  </ContactActionButton>
                </ContentWrapper>
              </ContactCardComponent>
            ))}
          </>
        )}
      </>
    </ContactlistComponent>
  );
};

export default ContactList;
