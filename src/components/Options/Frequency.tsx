import React from 'react';

import LedsContext from '../../context/LedsContext';

type State = {
  frequency: number;
};

export default class Frequency extends React.Component<Record<string, unknown>, State> {
  static contextType = LedsContext;

  context!: React.ContextType<typeof LedsContext>;

  state = {
    frequency: 10,
  };

  onChange(frequency: React.ChangeEvent<HTMLInputElement>): void {
    this.context.decorate('frequency', frequency.target.valueAsNumber);

    this.setState({ frequency: frequency.target.valueAsNumber });
  }

  render(): JSX.Element {
    return (
      <div className="mt-4">
        <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">
          Frequency
        </label>

        <div className="mt-1">
          <input
            id="frequency"
            className="rounded-lg w-full"
            type="range"
            min="1"
            max="10"
            step="1"
            defaultValue={this.state.frequency}
            onChange={this.onChange.bind(this)}
          />
        </div>
      </div>
    );
  }
}
