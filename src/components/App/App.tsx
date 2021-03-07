import React from 'react';
import { Transition } from '@headlessui/react';

import LedsComponent from '../Leds/Leds';
import Options from '../Options/Options';
import Indicator from '../Options/Indicator';

import Led from '../../models/Led';
import LedBehavior from '../../decorators/Behavior';
import LedBrightness from '../../decorators/Brightness';
import LedFrequency from '../../decorators/Frequency';
import LedIndicator from '../../decorators/Indicator';
import { Leds, Indicators } from '../../enums';
import LedsContext from '../../context/LedsContext';

type State = {
  leds: Led[];
  indicator: Indicators;
};

export default class App extends React.Component<Record<string, unknown>, State> {
  state: State = {
    leds: [new Led(Leds.Power), new Led(Leds.Skull), new Led(Leds.Eyes)],
    indicator: Indicators.Off,
  };

  toggle(led: Led): void {
    const leds = [...this.state.leds];
    const index = leds.findIndex((l) => l.id === led.id);

    leds[index].select(!led.isSelected());

    this.setState({ leds });
  }

  setIndicator(indicator: Indicators): void {
    let leds: Led[];

    if (indicator === Indicators.Off) {
      leds = this.state.leds.map((led: Led) => new Led(led.id).select(led.isSelected()));
    } else {
      leds = this.state.leds.map((led: Led) => {
        led.indicator = indicator;

        return led;
      });
    }

    this.setState({ leds, indicator });
  }

  decorate(decorator: string, value: number): void {
    let leds: Led[];

    switch (decorator) {
      case 'behavior':
        leds = this.state.leds.map((led: Led) => new LedBehavior(led).addOption(value));
        break;

      case 'brightness':
        leds = this.state.leds.map((led: Led) => new LedBrightness(led).addOption(value));
        break;

      case 'frequency':
        leds = this.state.leds.map((led: Led) => new LedFrequency(led).addOption(value));
        break;

      case 'indicator':
        leds = this.state.leds.map((led: Led) => new LedIndicator(led).addOption(value));
        break;

      default:
        leds = this.state.leds;
        break;
    }

    this.setState({ leds });
  }

  render(): JSX.Element {
    return (
      <div className="h-screen flex overflow-hidden bg-gray-100">
        <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
          <div className="flex-1 relative z-0 flex overflow-hidden">
            <LedsContext.Provider
              value={{
                leds: this.state.leds,
                indicator: this.state.indicator,
                toggle: this.toggle.bind(this),
                setIndicator: this.setIndicator.bind(this),
                decorate: this.decorate.bind(this),
              }}
            >
              <div className="z-50 relative flex flex-col flex-shrink-0 w-96 bg-white shadow-md">
                <div className="absolute inset-0 py-6 px-8">
                  <LedsComponent />
                </div>
              </div>
              <div className="relative flex flex-col flex-shrink-0 w-96 border-l border-gray-200">
                <Transition
                  show={!!this.state.leds.filter((led: Led) => led.isSelected()).length}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <div className="absolute inset-0 py-6 px-8">
                    {this.state.indicator < 6 && (
                      <Transition
                        show={true}
                        enter="transition-opacity duration-25"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-50"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Options />
                      </Transition>
                    )}

                    <Indicator />
                  </div>
                </Transition>
              </div>
              <div className="flex-1 relative z-0 overflow-y-auto border-l border-gray-200">
                <div className="absolute inset-0 py-6 px-8">
                  {this.state.leds.map((led: Led) => (
                    <div key={led.id}>
                      <strong>{led.name}</strong>
                      <ul>
                        {led.getOptions().map((option: string, index: number) => (
                          <li key={index}>{option}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </LedsContext.Provider>
          </div>
        </div>
      </div>
    );
  }
}
