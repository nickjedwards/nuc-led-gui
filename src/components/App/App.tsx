import React from 'react';
import { Transition } from '@headlessui/react';

import Leds from '../Leds/Leds';
import Options from '../Options/Options';
import { Led } from '../../types';
import LedsContext from '../../context/LedsContext';

type State = {
  leds: Array<Led>;
};

export default class App extends React.Component<Record<string, unknown>, State> {
  state = {
    leds: [
      {
        id: 0,
        name: 'Power',
        selected: false,
      },
      {
        id: 2,
        name: 'Skull',
        selected: false,
      },
      {
        id: 3,
        name: 'Eyes',
        selected: false,
      },
    ],
  };

  toggle(led: Led): void {
    const leds = [...this.state.leds];
    const index = leds.findIndex((l) => l.id === led.id);

    leds[index].selected = !led.selected;

    this.setState({ leds });
  }

  render(): JSX.Element {
    const leds = this.state.leds.filter((led: Led) => led.selected === true);

    return (
      <div className="h-screen flex overflow-hidden bg-gray-100">
        <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
          <div className="flex-1 relative z-0 flex overflow-hidden">
            <LedsContext.Provider value={{ leds: this.state.leds, toggle: this.toggle.bind(this) }}>
              <div className="z-50 relative flex flex-col flex-shrink-0 w-96 bg-white shadow-md">
                <div className="absolute inset-0 py-6 px-8">
                  <Leds />
                </div>
              </div>
              <div className="relative flex flex-col flex-shrink-0 w-96 border-l border-gray-200">
                <Transition
                  show={!!leds.length}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <div className="absolute inset-0 py-6 px-8">
                    <div className="h-full">
                      <Options />
                    </div>
                  </div>
                </Transition>
              </div>
              <div className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
                <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
                  <div className="h-full border-2 border-gray-200 border-dashed rounded-lg"></div>
                </div>
              </div>
            </LedsContext.Provider>
          </div>
        </div>
      </div>
    );
  }
}
