import React from 'react';

import Led from '../models/Led';
import { Indicators } from '../enums';

type LedsContext = {
  leds: Led[];
  indicator: Indicators;
  toggle: (led: Led) => void;
  setIndicator: (indicator: Indicators) => void;
  decorate: (decorator: string, value: number) => void;
};

export default React.createContext<LedsContext>({
  leds: [],
  indicator: Indicators.Off,
  toggle: () => undefined,
  setIndicator: () => undefined,
  decorate: () => undefined,
});
