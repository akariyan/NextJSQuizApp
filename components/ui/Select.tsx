import { Dispatch, SetStateAction } from "react";
import { styled } from "../../stitches.config";
import { ISelectBoxOption } from "../../types/selectBoxOption";

const StyledSelect = styled("select", {
  width: "80%",
  height: "4vh",
  fontSize: "0.7em",
});

interface IProps {
  name: string;
  options: ISelectBoxOption[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

function Select({ name, options, onChange }: IProps) {
  const optionsList = options.map((option) =>
    option.group ? (
      <optgroup id={option.group} label={option.group}>
        {option.children.map((child) => (
          <option key={child.id} value={child.value} label={child.text} />
        ))}
      </optgroup>
    ) : (
      <option key={option.id} value={option.value} label={option.text} />
    )
  );
  return (
    <StyledSelect name={name} onChange={onChange}>
      {optionsList}
    </StyledSelect>
  );
}

export default Select;
