import { styled } from "../../stitches.config";

const StyledButton = styled("button", {
  backgroundColor: "$s_cyanblue",
  color: "$white",
  fontSize: "2em",
});

const Button = (props) => (
  <StyledButton onClick={props.onClick}>{props.name}</StyledButton>
);

export default Button;
