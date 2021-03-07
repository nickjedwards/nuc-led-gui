import React from 'react';

import LedItem from './Led/Led';
import LedsContext from '../../context/LedsContext';
import Led from '../../models/Led';

export default class Leds extends React.Component {
  static contextType = LedsContext;

  context!: React.ContextType<typeof LedsContext>;

  render(): JSX.Element {
    return (
      <ul className="space-y-4">
        {this.context.leds.map((led: Led) => (
          <LedItem key={led.id} led={led} />
        ))}
      </ul>
    );
  }
}
