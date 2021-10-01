import { styled } from "../../stitches.config";
import { ISelectBoxOption } from "../../types/selectBoxOption";

const StyledSelect = styled("select", {});

interface IProps {
  name: string;
  options: ISelectBoxOption[];
}

function Select({ name, options }: IProps) {
  const optionList = options.map((option) =>
    option.group ? (
      <optgroup label={option.group}>
        {option.children.map((child) => (
          <option key={child.id} value={child.value} label={child.text} />
        ))}
      </optgroup>
    ) : (
      <option key={option.id} value={option.value} label={option.text} />
    )
  );
  return <StyledSelect name={name}>{optionList}</StyledSelect>;
}

export default Select;
