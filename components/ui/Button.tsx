import { styled } from "../../stitches.config";

const StyledButton = styled("button", {
  fontSize: "1.5em",
  backgroundColor: "$s_CyanBlue",
  color: "$white",
});

interface IProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  name: string;
}

const Button = ({ onClick, name }: IProps) => (
  <StyledButton onClick={onClick}>{name}</StyledButton>
);

export default Button;
