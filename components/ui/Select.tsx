import { styled } from "../../stitches.config";

const StyledSelect = styled("select", {});

const Select = (props) => (
  <StyledSelect name={props.name}>{props.children}</StyledSelect>
);

export default Select;
