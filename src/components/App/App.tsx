import React from 'react';
import { Transition } from '@headlessui/react';

import LedsComponent from '../Leds/Leds';
import Behavior from '../Options/Behavior';
import Brightness from '../Options/Brightness';
import Color from '../Options/Color';
import Frequency from '../Options/Frequency';
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

  icon(name: string): JSX.Element {
    switch (name) {
      case Leds[Leds.Power]:
        return (
          <svg
            className="-ml-1.5 mr-1 h-5 w-5 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case Leds[Leds.Skull]:
        return (
          <svg
            className="-ml-1.5 mr-1 h-5 w-5 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case Leds[Leds.Eyes]:
        return (
          <svg
            className="-ml-1.5 mr-1 h-5 w-5 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        );
      default:
        return <></>;
    }
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
                    {this.state.indicator < Indicators.Off && (
                      <Transition
                        show={this.state.indicator < Indicators.Off}
                        enter="transition-opacity duration-25"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-50"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Behavior />

                        <Brightness />

                        <Color />

                        <Frequency />
                      </Transition>
                    )}

                    <Indicator indicator={this.state.indicator} />
                  </div>
                </Transition>
              </div>
              <div className="flex-1 relative z-0 overflow-y-auto border-l border-gray-200">
                <div className="absolute inset-0 py-6 px-8">
                  {this.state.leds.map((led: Led) => (
                    <div key={led.id}>
                      <div className="relative mb-4">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex items-center justify-between">
                          <div className="flex items-center pr-3 bg-gray-100 text-lg font-medium text-gray-900">
                            {this.icon(led.name)}
                            <span>{led.name}</span>
                          </div>
                          <button
                            type="button"
                            className="inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <svg
                              className="-ml-1.5 mr-1 h-5 w-5 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            <span>Run</span>
                          </button>
                        </div>
                      </div>
                      <div key={led.id} className="bg-gray-200 overflow-hidden rounded-lg mb-4">
                        <div className="px-4 py-5 sm:p-6">
                          <ul>
                            {led.isSelected() ? (
                              <Transition
                                show={led.isSelected()}
                                enter="transition-opacity duration-25"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity duration-50"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                {led.getOptions().map((option: string, index: number) => (
                                  <li key={index}>{option}</li>
                                ))}
                              </Transition>
                            ) : (
                              <></>
                            )}
                          </ul>
                        </div>
                      </div>
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
