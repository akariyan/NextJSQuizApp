import { InputHTMLAttributes } from "react";
import { styled } from "../../stitches.config";

const StyledInput = styled("input", {
  width: "80%",
  height: "4vh",
  fontSize: "0.7em",
  variants: {},
});

export interface InputGroupProps
  extends InputHTMLAttributes<HTMLInputElement> {}

function Text(props: InputGroupProps) {
  return <StyledInput {...props} />;
}

function Number(props: InputGroupProps) {
  return <StyledInput {...props} type="number" min="1" />;
}

function Radio(props: InputGroupProps) {
  return <StyledInput {...props} type="radio" />;
}

const InputGroup = {
  Text,
  Number,
  Radio,
};

export default InputGroup;
