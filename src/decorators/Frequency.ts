import Option from './Option';

export default class Frequency extends Option {
  /**
   * addOption
   * @param frequency
   */
  public addOption(frequency: number): Option {
    this.options.push(`set_indicator_value,${this.led.id},${this.led.indicator},2,${frequency}`);

    return this;
  }
}
