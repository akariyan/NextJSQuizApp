import { styled } from "../../stitches.config";

const StyledInput = styled("input", {});

function Input(props) {
  return (
    <StyledInput
      placeholder={props.hint}
      onChange={props.onChange}
    ></StyledInput>
  );
}

export default Input;
