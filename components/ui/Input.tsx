import { styled } from "../../stitches.config";

const StyledInput = styled("input", {
  width: "80%",
  height: "4vh",
  fontSize: "0.7em",
});

interface IProps {
  type: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  hint?: string;
  name?: string;
  value?: string;
}

function Input({ type, onChange, hint, name, value }: IProps) {
  return (
    <StyledInput
      placeholder={hint}
      onChange={onChange}
      type={type}
      {...(type == "number" ? { min: "1" } : {})}
      {...(type == "radio" ? { name: { name }, value: { value } } : {})}
    />
  );
}

export default Input;
