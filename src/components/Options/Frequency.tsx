import React from 'react';

import LedsContext from '../../context/LedsContext';

export default class Frequency extends React.Component {
  static contextType = LedsContext;

  context!: React.ContextType<typeof LedsContext>;

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
            defaultValue="10"
          />
        </div>
      </div>
    );
  }
}
