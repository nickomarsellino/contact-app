// InputSearch Component
// --------------------------------------------------------
import { useState } from "react";
import { Input, RadioButtonSection, SearchSection } from "./styles";
import {
  Button
} from "../../components";
interface InputSearchProps {
  handleGetSearchValue?: () => void,
  setValueSearch?: any
}

const InputSearch = ({
  handleGetSearchValue,
  setValueSearch,
}: InputSearchProps) => {
  const [placeholder, setPlaceholder] = useState<string>("Search Contact by ...");
  const [selectedSearchBy, setSelectedSearchBy] = useState<string>("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.value === "first_name"){
      setPlaceholder('Search Contact by First Name');
    } 
    else if(event.target.value === "last_name"){
      setPlaceholder('Search Contact by Last Name');
    } else {
      setPlaceholder('Search Contact by Phone Number');
    }
    setSelectedSearchBy(event.target.value); // Update the selected option state
  };

  const handleInputChange = (event?: any) => {
    setValueSearch(event.target.value);
  };

  return (
    <div>
      <p>Search By: </p>
      <RadioButtonSection>
        <label>
          <input
            type="radio"
            name="option"
            value="first_name"
            checked={selectedSearchBy === "first_name"}
            onChange={handleOptionChange}
          />
          First Name
        </label>
        <label>
          <input
            type="radio"
            name="option"
            value="last_name"
            checked={selectedSearchBy === "last_name"}
            onChange={handleOptionChange}
          />
          Last Name
        </label>
        <label>
          <input
            type="radio"
            name="option"
            value="phones"
            checked={selectedSearchBy === "phones"}
            onChange={handleOptionChange}
          />
          Phone Number
        </label>
      </RadioButtonSection>
      <SearchSection>
        <Input
          id="test"
          type="text"
          placeholder={placeholder}
          autoComplete="off"
          disabled={selectedSearchBy === ''}
          onChange={handleInputChange}
        />
        <Button disabled={selectedSearchBy === ''} textButton="Search" onClickButton={handleGetSearchValue}/>
      </SearchSection>
    </div>
  );
};

export default InputSearch;
