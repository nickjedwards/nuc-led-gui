import Option from './Option';

export default class Behavior extends Option {
  /**
   * addOption
   * @param behavior
   */
  public addOption(behavior: number): Option {
    this.options.push(`set_indicator_value,${this.led.id},${this.led.indicator},1,${behavior}`);

    return this;
  }
}
