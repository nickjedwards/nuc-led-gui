import React from 'react';
import { Listbox, Transition } from '@headlessui/react';

import LedsContext from '../../context/LedsContext';
import { Behaviors } from '../../enums';

type State = {
  behavior: string;
};

export default class Behavior extends React.Component<Record<string, unknown>, State> {
  static contextType = LedsContext;

  context!: React.ContextType<typeof LedsContext>;

  state = {
    behavior: Behaviors[Behaviors.Solid],
  };

  onChange(behavior: string): void {
    this.context.decorate('behavior', Behaviors[behavior as keyof typeof Behaviors]);

    this.setState({ behavior });
  }

  render(): JSX.Element {
    const behaviors: string[] = Object.keys(Behaviors).filter((behavior: string) => isNaN(Number(behavior)));

    return (
      <Listbox as="div" value={this.state.behavior} onChange={this.onChange.bind(this)}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm leading-5 font-medium text-gray-700">Behavior</Listbox.Label>

            <div className="relative mt-1">
              <span className="inline-block w-full rounded-md shadow-sm">
                <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <span className="block truncate">{this.state.behavior}</span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                      <path
                        d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Listbox.Button>
              </span>

              <Transition
                show={open}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="absolute mt-1 w-full rounded-md bg-white shadow-lg"
              >
                <Listbox.Options
                  static
                  className="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                >
                  {behaviors.map((behavior: string, index: number) => (
                    <Listbox.Option key={index} value={behavior}>
                      {({ selected, active }) => (
                        <div
                          className={`${
                            active ? 'text-white bg-blue-600' : 'text-gray-900'
                          } cursor-default select-none relative py-2 pl-3 pr-9`}
                        >
                          <span className={`${selected ? 'font-semibold' : 'font-normal'} block truncate`}>
                            {behavior}
                          </span>

                          {selected && (
                            <span
                              className={`${
                                active ? 'text-white' : 'text-blue-600'
                              } absolute inset-y-0 right-0 flex items-center pr-4`}
                            >
                              <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          )}
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    );
  }
}
