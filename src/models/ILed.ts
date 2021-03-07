export default interface ILed {
  id: number;

  name: string;

  indicator: number;

  selected: boolean;

  options: string[];

  select(selected: boolean): ILed;

  deselect(): ILed;

  isSelected(): boolean;

  addOption(value: number): ILed;

  getOptions(): string[];
}
