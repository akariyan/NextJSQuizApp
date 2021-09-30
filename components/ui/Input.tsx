import { styled } from "../../stitches.config";

const StyledInput = styled("input", {});

const Input = (props) => <StyledInput placeholder={props.hint}></StyledInput>;

export default Input;
