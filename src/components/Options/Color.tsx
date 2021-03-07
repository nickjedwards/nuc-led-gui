import React from 'react';

import LedsContext from '../../context/LedsContext';

type State = {
  color: string;
};

export default class Color extends React.Component<Record<string, unknown>, State> {
  static contextType = LedsContext;

  context!: React.ContextType<typeof LedsContext>;

  state = {
    color: '#0000ff',
  };

  onChange(color: React.ChangeEvent<HTMLInputElement>): void {
    // console.log(color);

    this.setState({ color: color.target.value });
  }

  render(): JSX.Element {
    return (
      <div className="mt-4">
        <label htmlFor="color" className="block text-sm font-medium text-gray-700">
          Color
        </label>

        <div className="mt-1">
          <input
            id="color"
            className="w-full"
            type="color"
            defaultValue={this.state.color}
            onChange={this.onChange.bind(this)}
          />
        </div>
      </div>
    );
  }
}
