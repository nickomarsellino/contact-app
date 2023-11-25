// InputSearch Component
// --------------------------------------------------------
import {Input} from './styles'

interface InputSearchProps {
  placeholder?: string;
  onChange?: Function;
}

const InputSearch = ({
  placeholder = "Search Contact",
  onChange = () => {},
}: InputSearchProps) => {

  const handleInputChange = (event ?: any) => {
    console.log("handleInputChange :", event.target.value);
  };

  return (
    <div style={{display: "flex"}}>
      <Input id="test" type="text" placeholder={placeholder} autoComplete="off"  disabled={false} onChange={handleInputChange}/>
    </div>
  );
};

export default InputSearch;
