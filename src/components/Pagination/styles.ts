import styled from "@emotion/styled";

export const PaginationActionButton = styled.button`
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  background-color: rgb(0, 170, 91);
  border-color: rgb(0, 170, 91);

  &:disabled{
    background-color: black;
  }

  path {
    fill: white; /* Change 'white' to the color you want */
  }

  &:hover {
    background-color: rgb(2, 146, 79);
  }

  &.disabled {
    background-color: rgb(228, 235, 245);

    path {
      fill: rgb(170, 180, 200);
    }
  }
`;

export const PaginationSection = styled("div")`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .prev-button {
    margin-right: 4px;
  }
`;

export const LabelPage = styled.p`
  margin-top: 0;
  margin-bottom: 0; 
  margin-right: 8px;
  font-size: 14px;
  color: rgb(109, 117, 136);
`;
