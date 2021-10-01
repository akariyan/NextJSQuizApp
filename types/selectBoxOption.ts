export interface ISelectBoxOption {
  id: number;
  group?: string;
  value?: string;
  text?: string;
  children?: ISelectBoxOption[];
}
