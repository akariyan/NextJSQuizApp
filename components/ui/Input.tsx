import { styled } from "../../stitches.config";

const StyledInput = styled("input", {});

function Input(props) {
  return <StyledInput placeholder={props.hint}></StyledInput>;
}

export default Input;
