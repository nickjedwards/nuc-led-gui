import ILed from '../models/ILed';

export default class Option implements ILed {
  id: number;

  name: string;

  indicator: number;

  selected: boolean;

  options: string[] = [];

  public constructor(protected led: ILed) {
    this.id = led.id;
    this.name = led.name;
    this.indicator = led.indicator;
    this.selected = led.isSelected();
  }

  public select(selected = true): ILed {
    this.selected = selected;
    this.led.select(selected);

    return this;
  }

  public deselect(): ILed {
    this.select(false);
    this.led.deselect();

    return this;
  }

  public isSelected(): boolean {
    return this.selected;
  }

  public addOption(value: number): ILed {
    this.options.push(`${value}`);

    return this;
  }

  public getOptions(): string[] {
    return [...this.led.getOptions(), ...this.options];
  }
}
