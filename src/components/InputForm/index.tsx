// InputForm Component
// --------------------------------------------------------
import styled from "@emotion/styled";

interface InputFormProps {
  label?: string;
  width?: string;
  placeholder?: string;
  onChange?: Function;
}

const InputForm: React.FC<InputFormProps> = ({
  label,
  placeholder,
  width,
  onChange,
}) => {

  const InputFormComponent = styled("div")`
    width: ${width ? width : "100%"};
    display: flex;
    flex-direction: column;
`;

  const Input = styled.input`
    display: block;
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 8px;
    outline: none;
    margin-bottom: 16px;

    &:focus {
      border: solid 1px rgb(0, 170, 91);
    }
  `;

  const Label = styled.label`
    font-weight: bold;
    display: block;
    font-size: 14px;
    margin-bottom: 4px;
  `;

  const handleInputChange = (event?: any) => {
    console.log("handleInputChange :", event.target.value);
  };

  return (
    <InputFormComponent>
      <Label>{label}</Label>
      <Input
        id="test"
        type="text"
        placeholder={placeholder}
        autoComplete="off"
        disabled={false}
        onChange={handleInputChange}
      />
    </InputFormComponent>
  );
};

export default InputForm;
