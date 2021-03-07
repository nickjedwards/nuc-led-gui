import { Leds, Indicators } from '../enums';
import ILed from './ILed';

export default class Led implements ILed {
  name: string;

  indicator: Indicators = Indicators.Off;

  selected = false;

  options: string[] = [];

  constructor(public id: Leds) {
    this.name = Leds[this.id];
  }

  public select(selected = true): ILed {
    this.selected = selected;

    return this;
  }

  public deselect(): ILed {
    this.select(false);

    return this;
  }

  public isSelected(): boolean {
    return this.selected;
  }

  public addOption(value: string | number): ILed {
    this.options.push(`${value}`);

    return this;
  }

  public getOptions(): string[] {
    return this.options;
  }
}
