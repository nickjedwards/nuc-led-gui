import Option from './Option';

export default class Brightness extends Option {
  /**
   * addOption
   * @param brightness
   */
  public addOption(brightness: number): Option {
    this.options.push(`set_indicator_value,${this.led.id},${this.led.indicator},0,${brightness}`);

    return this;
  }
}
