// Skeleton Component
// --------------------------------------------------------
import { Skeleton } from "./styles";

interface SkeletonProps {
  props?: string;
}

const Pagination: React.FC<SkeletonProps> = ({ props }) => {
  return <Skeleton className="skeleton" />;
};

export default Pagination;
