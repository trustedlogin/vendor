import { useEffect } from "react";

export const OnboardingLayout = ({ currentStep, children }) => {
  useEffect(() => {
    document.getElementById("adminmenumain").remove();
    document.getElementById("wpcontent").style.marginLeft = "0px";
  }, []);
  return (
    <>
      <div class="h-full overflow-hidden">
        <div class="h-full flex">
          <div class="flex-1 relative z-100 flex overflow-hidden">
            <main class="flex-1 relative z-100 overflow-y-auto focus:outline-none md:order-last">
              <div class="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
                <div class="h-full">
                  <div class="flex flex-col pt-12 w-full max-w-sm mx-auto">
                    <svg
                      class="mx-auto"
                      width="56"
                      height="56"
                      viewBox="0 0 56 56"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <rect
                        x="4"
                        y="4"
                        width="48"
                        height="48"
                        rx="24"
                        fill="#00AADD"
                      />
                      <path
                        d="M28 31V33V31ZM22 37H34C34.5304 37 35.0391 36.7893 35.4142 36.4142C35.7893 36.0391 36 35.5304 36 35V29C36 28.4696 35.7893 27.9609 35.4142 27.5858C35.0391 27.2107 34.5304 27 34 27H22C21.4696 27 20.9609 27.2107 20.5858 27.5858C20.2107 27.9609 20 28.4696 20 29V35C20 35.5304 20.2107 36.0391 20.5858 36.4142C20.9609 36.7893 21.4696 37 22 37ZM32 27V23C32 21.9391 31.5786 20.9217 30.8284 20.1716C30.0783 19.4214 29.0609 19 28 19C26.9391 19 25.9217 19.4214 25.1716 20.1716C24.4214 20.9217 24 21.9391 24 23V27H32Z"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <rect
                        x="4"
                        y="4"
                        width="48"
                        height="48"
                        rx="24"
                        stroke="#CDEFF9"
                        stroke-width="8"
                      />
                    </svg>
                    <div class="max-w-sm mx-auto mb-8 justify-center text-center">
                      <h2 class="mt-4 text-2xl text-gray-900">
                        Link your TrustedLogin account
                      </h2>
                      <p class="mt-2 mb-4 text-sm text-gray-500">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed ornare tortor in nisl fermentum.
                      </p>
                      <a class="text-blue-tl text-sm" href="#">
                        Where can I find this info?
                      </a>
                    </div>
                    <div class="flex flex-1 flex-col space-y-6">
                      <div>
                        <label
                          for="account-id"
                          class="block text-sm font-medium text-gray-700">
                          Account ID
                        </label>
                        <div class="mt-2 relative rounded-lg">
                          <input
                            type="text"
                            name="account-id"
                            id="account-id"
                            class="block w-full pl-3 pr-10 py-2.5 sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 ring-offset-2 focus:ring-sky-500"
                            placeholder=""
                          />
                          <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M6.06004 6.00004C6.21678 5.55449 6.52614 5.17878 6.93334 4.93946C7.34055 4.70015 7.8193 4.61267 8.28483 4.69252C8.75035 4.77236 9.17259 5.01439 9.47676 5.37573C9.78093 5.73706 9.94741 6.19439 9.94671 6.66671C9.94671 8.00004 7.94671 8.66671 7.94671 8.66671M8.00004 11.3334H8.00671M14.6667 8.00004C14.6667 11.6819 11.6819 14.6667 8.00004 14.6667C4.31814 14.6667 1.33337 11.6819 1.33337 8.00004C1.33337 4.31814 4.31814 1.33337 8.00004 1.33337C11.6819 1.33337 14.6667 4.31814 14.6667 8.00004Z"
                                stroke="#98A2B3"
                                stroke-width="1.33333"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label
                          for="api-key"
                          class="block text-sm font-medium text-gray-700">
                          API Key
                        </label>
                        <div class="mt-2 relative rounded-lg">
                          <input
                            type="text"
                            name="api-key"
                            id="api-key"
                            class="w-full pl-3 pr-10 py-2.5 sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 ring-offset-2 focus:ring-sky-500"
                            placeholder=""
                          />
                          <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M6.06004 6.00004C6.21678 5.55449 6.52614 5.17878 6.93334 4.93946C7.34055 4.70015 7.8193 4.61267 8.28483 4.69252C8.75035 4.77236 9.17259 5.01439 9.47676 5.37573C9.78093 5.73706 9.94741 6.19439 9.94671 6.66671C9.94671 8.00004 7.94671 8.66671 7.94671 8.66671M8.00004 11.3334H8.00671M14.6667 8.00004C14.6667 11.6819 11.6819 14.6667 8.00004 14.6667C4.31814 14.6667 1.33337 11.6819 1.33337 8.00004C1.33337 4.31814 4.31814 1.33337 8.00004 1.33337C11.6819 1.33337 14.6667 4.31814 14.6667 8.00004Z"
                                stroke="#98A2B3"
                                stroke-width="1.33333"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div class="pt-2 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                        <button
                          type="button"
                          class="w-full inline-flex justify-center rounded-lg border border-transparent px-4 py-2.5 bg-blue-tl text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 ring-offset-2 focus:ring-sky-500 sm:col-start-2 sm:text-sm">
                          Continue
                        </button>
                        <button
                          type="button"
                          class="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 px-4 py-2.5 bg-white text-base font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 ring-offset-2 focus:ring-sky-500 sm:mt-0 sm:col-start-1 sm:text-sm">
                          Skip
                        </button>
                      </div>
                      <nav
                        class="flex items-center justify-center"
                        aria-label="Progress">
                        <ol
                          role="list"
                          class="flex items-center space-x-3 mt-2">
                          <li>
                            <a
                              href="#"
                              class="block w-2 h-2 bg-blue-tl rounded-full">
                              <span class="sr-only">Step 1</span>
                            </a>
                          </li>

                          <li>
                            <a
                              href="#"
                              class="block w-2 h-2 bg-blue-tl-200 rounded-full hover:bg-gray-400"
                              aria-current="step">
                              <span class="sr-only">Step 2</span>
                            </a>
                          </li>

                          <li>
                            <a
                              href="#"
                              class="block w-2 h-2 bg-blue-tl-200 rounded-full hover:bg-gray-400">
                              <span class="sr-only">Step 3</span>
                            </a>
                          </li>

                          <li>
                            <a
                              href="#"
                              class="block w-2 h-2 bg-blue-tl-200 rounded-full hover:bg-gray-400">
                              <span class="sr-only">Step 4</span>
                            </a>
                          </li>
                        </ol>
                      </nav>
                      <div class="inline-flex pt-12 items-center justify-center sm:hidden">
                        <a class="text-sm text-blue-tl" href="#">
                          Need Help? View our Documentation
                        </a>
                        <svg
                          class="ml-3"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M1.16663 7.00008H12.8333M12.8333 7.00008L6.99996 1.16675M12.8333 7.00008L6.99996 12.8334"
                            stroke="#00AADD"
                            stroke-width="1.67"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};
