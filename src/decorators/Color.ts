import Option from './Option';

type Rgb = {
  r: number;
  b: number;
  g: number;
};

export class Color extends Option {
  /**
   * addOption
   * @param hex
   */
  public addOption(hex: number): Option {
    const { r, g, b }: Rgb = this.hexToRgb(hex);

    this.options.push(
      `set_indicator_value,${this.led.id},${this.led.indicator},3,${r}`,
      `set_indicator_value,${this.led.id},${this.led.indicator},4,${g}`,
      `set_indicator_value,${this.led.id},${this.led.indicator},5,${b}`,
    );

    return this;
  }

  /**
   * hexToRgb
   * @param hex
   */
  private hexToRgb(hex: string): Rgb {
    // Expand shorthand (e.g. 03F) to full form (e.g. 0033FF)
    hex = hex.replace(/^#?([\dA-F])([\dA-F])([\dA-F])$/i, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });

    const result = /^#?([\dA-F]{2})([\dA-F]{2})([\dA-F]{2})$/i.exec(hex);

    return result
      ? { r: Number(`0x${result[1]}`), g: Number(`0x${result[2]}`), b: Number(`0x${result[3]}`) }
      : { r: 0, g: 0, b: 255 };
  }
}
