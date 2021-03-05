import React from 'react';

import LedsContext from '../../context/LedsContext';

export default class Brightness extends React.Component {
  static contextType = LedsContext;

  context!: React.ContextType<typeof LedsContext>;

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
            defaultValue="50"
          />
        </div>
      </div>
    );
  }
}
