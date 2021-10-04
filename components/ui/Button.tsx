import { styled } from "../../stitches.config";

const StyledButton = styled("button", {
  backgroundColor: "$s_cyanblue",
  color: "$white",
  fontSize: "2em",
});

interface IProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  name: string;
}

const Button = ({ onClick, name }: IProps) => (
  <StyledButton onClick={onClick}>{name}</StyledButton>
);

export default Button;
