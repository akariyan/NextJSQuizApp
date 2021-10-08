import { ButtonHTMLAttributes } from "react";
import { styled } from "../../stitches.config";

const StyledButton = styled("button", {
  fontSize: "1.5em",
  backgroundColor: "$s_CyanBlue",
  color: "$white",
});

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = (props: ButtonProps) => <StyledButton {...props} />;

export default Button;
