// Text Component
// --------------------------------------------------------
import { Text } from "./styles";

interface PaginationProps {
  children?: string;
}

const Pagination: React.FC<PaginationProps> = ({ children }) => {
  return (
    <>
      <Text>{children}</Text>
    </>
  );
};

export default Pagination;
