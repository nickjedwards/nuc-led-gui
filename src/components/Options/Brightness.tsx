import React from 'react';

import LedsContext from '../../context/LedsContext';

type State = {
  brightness: number;
};

export default class Brightness extends React.Component<Record<string, unknown>, State> {
  static contextType = LedsContext;

  context!: React.ContextType<typeof LedsContext>;

  state = {
    brightness: 50,
  };

  onChange(brightness: React.ChangeEvent<HTMLInputElement>): void {
    this.context.decorate('brightness', brightness.target.valueAsNumber);

    this.setState({ brightness: brightness.target.valueAsNumber });
  }

  render(): JSX.Element {
    return (
      <div className="mt-4">
        <label htmlFor="brightness" className="block text-sm font-medium text-gray-700">
          Brightness
        </label>

        <div className="mt-1">
          <input
            id="brightness"
            className="rounded-lg w-full"
            type="range"
            min="1"
            max="100"
            step="1"
            defaultValue={this.state.brightness}
            onChange={this.onChange.bind(this)}
          />
        </div>
      </div>
    );
  }
}
