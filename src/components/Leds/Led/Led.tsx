import React from 'react';

import { Led } from '../../../types';
import LedsContext from '../../../context/LedsContext';

type Props = {
  led: Led;
};

export default class LedItem extends React.Component<Props> {
  static contextType = LedsContext;

  context!: React.ContextType<typeof LedsContext>;

  render(): JSX.Element {
    return (
      <li
        onClick={() => this.context.toggle(this.props.led)}
        tabIndex={0}
        role="radio"
        className="group relative bg-white rounded-lg shadow-sm cursor-pointer focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <div className="rounded-lg border border-gray-300 bg-white px-6 py-4 hover:border-gray-400 sm:flex sm:justify-between">
          <div className="flex items-center">
            <div className="text-sm">
              <p className="font-medium text-gray-900">{this.props.led.name}</p>
            </div>
          </div>
        </div>
        <div
          className={`${
            this.props.led.selected ? 'border-indigo-500' : 'border-transparent'
          } absolute inset-0 rounded-lg border-2 pointer-events-none`}
        ></div>
      </li>
    );
  }
}
