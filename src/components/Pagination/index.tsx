// Pagination Component
// --------------------------------------------------------
import { PaginationActionButton } from "./styles";
import { ReactComponent as ArrowLeft } from "../../assets/image/arrow-left.svg";
import { ReactComponent as ArrowRight } from "../../assets/image/arrow-right.svg";

interface PaginationProps {
  handleClickDelete?: (id: number) => void;
  handleClickFavorite?: (id: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  handleClickDelete,
  handleClickFavorite,
}) => {
  return (
    <>
      <PaginationActionButton>
        <ArrowLeft />
      </PaginationActionButton>
      <PaginationActionButton>
        <ArrowRight />
      </PaginationActionButton>
    </>
  );
};

export default Pagination;
