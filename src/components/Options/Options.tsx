import React from 'react';

import Behavior from './Behavior';
import Brightness from './Brightness';
import Frequency from './Frequency';
import LedsContext from '../../context/LedsContext';

export default class Options extends React.Component {
  static contextType = LedsContext;

  context!: React.ContextType<typeof LedsContext>;

  render(): JSX.Element {
    return (
      <>
        <Behavior />

        <Brightness />

        <Frequency />
      </>
    );
  }
}
