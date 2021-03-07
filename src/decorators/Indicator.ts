import Option from './Option';

export default class Indicator extends Option {
  /**
   * addOption
   * @param indicator
   */
  public addOption(indicator: number): Option {
    this.options.push(`set_indicator,${this.led.id},${indicator}`);

    return this;
  }
}
