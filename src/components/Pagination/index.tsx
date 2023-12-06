// Pagination Component
// --------------------------------------------------------
import { PaginationActionButton, PaginationSection, LabelPage } from "./styles";
import { ReactComponent as ArrowLeft } from "../../assets/image/arrow-left.svg";
import { ReactComponent as ArrowRight } from "../../assets/image/arrow-right.svg";

interface PaginationProps {
  totalPage?: number;
  currentPage?: number;
  disableNextButton?: boolean;
  disablePrevButton?: boolean;
  handleClickNext?: () => void;
  handleClickPrev?: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPage,
  currentPage,
  disableNextButton,
  disablePrevButton,
  handleClickNext,
  handleClickPrev,
}) => {
  return (
    <PaginationSection>
      {/* <LabelPage>{`${(currentPage && currentPage === 0) ? 1 : currentPage && currentPage + 1} of ${totalPage && totalPage + 1} Page`}</LabelPage> */}
      <LabelPage>{`${currentPage !== undefined ? currentPage : 1} of ${totalPage && totalPage} Page`}</LabelPage>
      <PaginationActionButton disabled={disablePrevButton} className={`${disablePrevButton && 'disabled'} prev-button`} onClick={handleClickPrev}>
        <ArrowLeft />
      </PaginationActionButton>
      <PaginationActionButton disabled={disableNextButton} className={`${disableNextButton && 'disabled'} next-button`} onClick={handleClickNext}>
        <ArrowRight />
      </PaginationActionButton>
    </PaginationSection>
  );
};

export default Pagination;
