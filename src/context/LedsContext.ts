import React from 'react';

import { Led } from '../types';

type LedsContext = {
  leds: Array<Led>;
  toggle: (led: Led) => void;
};

export default React.createContext<LedsContext>({
  leds: [],
  toggle: () => undefined,
});
