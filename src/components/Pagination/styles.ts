import styled from "@emotion/styled";

export const PaginationActionButton = styled("div")`
  background-color: rgb(0, 170, 91);
  border-color: rgb(0, 170, 91);
  width: 24px;
  height: 24px;
  border-radius: 8px;
  padding: 4px;
  cursor: pointer;

  path {
    fill: white; /* Change 'white' to the color you want */
  }

  &:hover {
    background-color: rgb(197, 36, 73);
  }
`;
