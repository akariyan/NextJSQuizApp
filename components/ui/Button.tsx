import { styled } from "../../stitches.config";

const StyledButton = styled("button", {});

const Button = (props) => <StyledButton>{props.name}</StyledButton>;

export default Button;
