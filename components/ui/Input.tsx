import { styled } from "../../stitches.config";

const StyledInput = styled("input", {});

interface IProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  hint: string;
}

function Input({ onChange, hint }: IProps) {
  return <StyledInput placeholder={hint} onChange={onChange}></StyledInput>;
}

export default Input;
