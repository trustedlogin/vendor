import { useEffect } from "react";
import Layout from "./Layout";
import { HorizontalLogo } from "./TrustedLoginLogo";


const Aside = {
  CurrentStep: ({title,subTitle}) => (
    <li className="relative pb-10">
      <div
        className="-ml-px  mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
        aria-hidden="true"></div>
      <a
        href="#"
        className="relative flex items-start group"
      >
        <span className="h-9 flex items-center">
          <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-blue-tl rounded-full">
            <span className="h-2.5 w-2.5 bg-blue-tl rounded-full"></span>
          </span>
        </span>
        <span className="ml-4 min-w-0 flex flex-col">
          <span className="text-xs font-semibold tracking-wide uppercase text-blue-tl">
            {title}
          </span>
          <span className="text-sm text-gray-500">
            {subTitle}
          </span>
        </span>
      </a>
    </li>
  ),
  FutureStep: ({title,subTitle}) => (
    <li className="relative pb-10">
      <div
        className="-ml-px  mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
        aria-hidden="true"></div>
      <a
        href="#"
        className="relative flex items-start group"
        aria-current="step"
      >
        <span
          className="h-9 flex items-center"
          aria-hidden="true"
        >
          <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400">
            <span className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300"></span>
          </span>
        </span>
        <span className="ml-4 min-w-0 flex flex-col">
          <span className="text-xs font-semibold tracking-wide uppercase text-gray-500">
            {title}
          </span>
          <span className="text-sm text-gray-500">
            {subTitle}
          </span>
        </span>
      </a>
    </li>
  )
}

const Main = {
  CurrentStep: ({step}) => (
    <li>
      <a
        href="#"
        className="block w-2 h-2 bg-blue-tl rounded-full">
        <span className="sr-only">Step {step}</span>
      </a>
    </li>
  ),
  FutureStep: ({step}) => (
    <li>
      <a
        href="#"
        className="block w-2 h-2 bg-blue-tl-200 rounded-full hover:bg-gray-400"
        aria-current="step">
        <span className="sr-only">Step {step}</span>
      </a>
    </li>
  )
}

/**
 *
 * I removed .absolute from design to make it appear on the screen
 */
export const OnboardingLayout = ({ currentStep, children }) => {
  useEffect(() => {
    document.getElementById("adminmenumain").remove();
    document.getElementById("wpfooter").remove();
    document.getElementById("wpcontent").style.marginLeft = "0px";
  }, []);
  return (
    <>
      <Layout>
        <div className="h-full flex bg-white">
          <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
            <div className="flex-1 relative z-0 flex overflow-hidden">
              <div
                id={"trustedlogin-onboarding-main"}
                className="flex-1 relative z-0 overflow-y-auto focus:outline-none md:order-last">
                <div className=" inset-0 py-6 px-4 sm:px-6 lg:px-8">
                  <div className="h-full">
                    <div className="flex flex-col pt-12 w-full max-w-sm mx-auto">
                      <svg
                        className="mx-auto"
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
                      <div className="max-w-sm mx-auto mb-8 justify-center text-center">
                        <h2 className="mt-4 text-2xl text-gray-900">
                          Link your TrustedLogin account
                        </h2>
                        <p className="mt-2 mb-4 text-sm text-gray-500">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Sed ornare tortor in nisl fermentum.
                        </p>
                        <a className="text-blue-tl text-sm" href="#">
                          Where can I find this info?
                        </a>
                      </div>
                      <div className="flex flex-1 flex-col space-y-6">
                        <div>
                          <label
                            for="account-id"
                            className="block text-sm font-medium text-gray-700">
                            Account ID
                          </label>
                          <div className="mt-2 relative rounded-lg">
                            <input
                              type="text"
                              name="account-id"
                              id="account-id"
                              className="block w-full pl-3 pr-10 py-2.5 sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 ring-offset-2 focus:ring-sky-500"
                              placeholder=""
                            />
                            <div className=" inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
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
                            className="block text-sm font-medium text-gray-700">
                            API Key
                          </label>
                          <div className="mt-2 relative rounded-lg">
                            <input
                              type="text"
                              name="api-key"
                              id="api-key"
                              className="w-full pl-3 pr-10 py-2.5 sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 ring-offset-2 focus:ring-sky-500"
                              placeholder=""
                            />
                            <div className=" inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
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
                        <div className="pt-2 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                          <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-lg border border-transparent px-4 py-2.5 bg-blue-tl text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 ring-offset-2 focus:ring-sky-500 sm:col-start-2 sm:text-sm">
                            Continue
                          </button>
                          <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 px-4 py-2.5 bg-white text-base font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 ring-offset-2 focus:ring-sky-500 sm:mt-0 sm:col-start-1 sm:text-sm">
                            Skip
                          </button>
                        </div>
                        <nav
                          className="flex items-center justify-center"
                          aria-label="Progress">
                          <ol
                            role="list"
                            className="flex items-center space-x-3 mt-2">
                            <Main.CurrentStep step={1} />
                            <Main.FutureStep step={1} />
                            <Main.FutureStep step={2} />
                          </ol>
                        </nav>
                        <div className="inline-flex pt-12 items-center justify-center sm:hidden">
                          <a className="text-sm text-blue-tl" href="#">
                            Need Help? View our Documentation
                          </a>
                          <svg
                            className="ml-3"
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
              </div>
              <aside
                className="hidden relative bg-gray-tl md:order-first md:flex md:flex-col flex-shrink-0 min-w-[26rem] overflow-y-auto"
                id={"trustedlogin-onboarding-side"}
              >
                <div
                  className="inset-0"
                >
                  <div className="h-full flex flex-col justify-between p-12">
                    <div className="space-y-16">
                      <div>
                        <HorizontalLogo />
                      </div>
                      <div>
                        <nav aria-label="Progress">
                          <ol role="list" className="overflow-hidden">

                            <Aside.CurrentStep
                              title={'Link your account'}
                              subTitle={'Vitae sed mi luctus laoreet.'}
                            />
                            <Aside.FutureStep
                              title={'Create Team'}
                              subTitle={'Cursus semper viverra facilisis et et some more.'}
                            />
                            <Aside.FutureStep
                            title={'Configure Help Desk'}
                            subTitle={'Penatibus eu quis ante.'}
                            />

                          </ol>
                        </nav>
                      </div>
                    </div>
                    <div className="inline-flex items-center justify-center">
                      <a className="text-sm text-blue-tl" href="#">
                        Need Help? View our Documentation
                      </a>
                      <svg
                        className="ml-3"
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
              </aside>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
