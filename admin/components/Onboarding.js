import { useEffect } from "react";
import Layout from "./Layout";
import { HorizontalLogo } from "./TrustedLoginLogo";
import { InputField, SelectField, Label } from "./onboarding/fields";

const Aside = {
  CurrentStep: ({ title, subTitle }) => (
    <li className="relative pb-10">
      <div
        className="-ml-px  mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
        aria-hidden="true"></div>
      <a href="#" className="relative flex items-start group">
        <span className="h-9 flex items-center">
          <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-blue-tl rounded-full">
            <span className="h-2.5 w-2.5 bg-blue-tl rounded-full"></span>
          </span>
        </span>
        <span className="ml-4 min-w-0 flex flex-col">
          <span className="text-xs font-semibold tracking-wide uppercase text-blue-tl">
            {title}
          </span>
          <span className="text-sm text-gray-500">{subTitle}</span>
        </span>
      </a>
    </li>
  ),
  FutureStep: ({ title, subTitle }) => (
    <li className="relative pb-10">
      <div
        className="-ml-px  mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
        aria-hidden="true"></div>
      <a
        href="#"
        className="relative flex items-start group"
        aria-current="step">
        <span className="h-9 flex items-center" aria-hidden="true">
          <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400">
            <span className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300"></span>
          </span>
        </span>
        <span className="ml-4 min-w-0 flex flex-col">
          <span className="text-xs font-semibold tracking-wide uppercase text-gray-500">
            {title}
          </span>
          <span className="text-sm text-gray-500">{subTitle}</span>
        </span>
      </a>
    </li>
  ),
};

const Main = {
  //List item link to current step
  CurrentStep: ({ step }) => (
    <li>
      <a href="#" className="block w-2 h-2 bg-blue-tl rounded-full">
        <span className="sr-only">Step {step}</span>
      </a>
    </li>
  ),
  //List item link to other step
  OtherStep: ({ step }) => (
    <li>
      <a
        href="#"
        className="block w-2 h-2 bg-blue-tl-200 rounded-full hover:bg-gray-400"
        aria-current="step">
        <span className="sr-only">Step {step}</span>
      </a>
    </li>
  ),
  //Display a step
  Step: ({ children }) => (
    <div className=" inset-0 py-6 px-4 sm:px-6 lg:px-8">
      <div className="h-full">{children}</div>
    </div>
  ),
  Dots: ({ step }) => {
    switch (step) {
      case 3:
        return (
          <>
            <Main.OtherStep step={1} />
            <Main.OtherStep step={2} />
            <Main.CurrentStep step={3} />
          </>
        );
      case 2:
        return (
          <>
            <Main.OtherStep step={1} />
            <Main.CurrentStep step={2} />
            <Main.OtherStep step={3} />
          </>
        );
      default:
      case 1:
        return (
          <>
            <Main.OtherStep step={1} />
            <Main.OtherStep step={2} />
            <Main.CurrentStep step={3} />
          </>
        );
    }
  },
  StepBottom: ({ step, singleStepMode = true }) => {
    return (
      <>
        {!singleStepMode ? (
          <nav
            className="flex items-center justify-center"
            aria-label="Progress">
            <ol role="list" className="flex items-center space-x-3 mt-2">
              <Main.Dots step={step} />
            </ol>
          </nav>
        ) : null}
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
      </>
    );
  },
};

//Display Step one
const StepOne = () => {
  return (
    <>
      <>
        <div className="max-w-sm mx-auto mb-8 justify-center text-center">
          <h2 className="mt-4 text-2xl text-gray-900">
            Link your TrustedLogin account
          </h2>
          <p className="mt-2 mb-4 text-sm text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare
            tortor in nisl fermentum.
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
              for="public_key"
              className="block text-sm font-medium text-gray-700">
              Public Key
            </label>
            <div className="mt-2 relative rounded-lg">
              <input
                type="text"
                name="public_key"
                id="public_key"
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
        </div>
      </>
    </>
  );
};

const StepTwo = () => {
  return (
    <>
      <div className="max-w-sm mx-auto mb-8 justify-center text-center">
        <h2 className="mt-4 text-2xl text-gray-900">Create your first team</h2>
        <p className="mt-2 mb-4 text-sm text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare
          tortor in nisl fermentum.
        </p>
        <a className="text-blue-tl text-sm" href="#">
          Where can I find this info?
        </a>
      </div>
      <div className="flex flex-1 flex-col space-y-6">
        <InputField type="text" id="account_id" label={"Account ID"} />
        <InputField type="text" id="public_key" label={"Public Key"} />
        <InputField type="text" id="private_key" label={"Private Key"} />
        <SelectField label={"What Roles Provide Support?"} id="approved_roles">
          <option>Select Roles</option>
          <option>Administrator</option>
          <option>Editor</option>
          <option>Contributor</option>
        </SelectField>
        <SelectField label={"Select a Help Desk"} id="help_desks">
          <option>Select a Help Desk</option>
          <option value={"helpscout"}>Help Scout</option>
          <option value={"zendesk"}>Zendesk</option>
        </SelectField>
        <div className="pt-2">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-lg border border-transparent px-4 py-2.5 bg-blue-tl text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 ring-offset-2 focus:ring-sky-500 sm:col-start-2 sm:text-sm">
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

const Icon = ({ step }) => {
  switch (step) {
    case 2:
      return (
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
            fill="#00AADD"></rect>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M28 26C26.9391 26 25.9217 25.5786 25.1716 24.8284C24.4214 24.0783 24 23.0609 24 22C24 20.9391 24.4214 19.9217 25.1716 19.1716C25.9217 18.4214 26.9391 18 28 18C29.0609 18 30.0783 18.4214 30.8284 19.1716C31.5786 19.9217 32 20.9391 32 22C32 23.0609 31.5786 24.0783 30.8284 24.8284C30.0783 25.5786 29.0609 26 28 26ZM22 36C20.9391 36 19.9217 35.5786 19.1716 34.8284C18.4214 34.0783 18 33.0609 18 32C18 30.9391 18.4214 29.9217 19.1716 29.1716C19.9217 28.4214 20.9391 28 22 28C23.0609 28 24.0783 28.4214 24.8284 29.1716C25.5786 29.9217 26 30.9391 26 32C26 33.0609 25.5786 34.0783 24.8284 34.8284C24.0783 35.5786 23.0609 36 22 36V36ZM34 36C32.9391 36 31.9217 35.5786 31.1716 34.8284C30.4214 34.0783 30 33.0609 30 32C30 30.9391 30.4214 29.9217 31.1716 29.1716C31.9217 28.4214 32.9391 28 34 28C35.0609 28 36.0783 28.4214 36.8284 29.1716C37.5786 29.9217 38 30.9391 38 32C38 33.0609 37.5786 34.0783 36.8284 34.8284C36.0783 35.5786 35.0609 36 34 36Z"
            stroke="white"
            stroke-width="2"></path>
          <rect
            x="4"
            y="4"
            width="48"
            height="48"
            rx="24"
            stroke="#CDEFF9"
            stroke-width="8"></rect>
        </svg>
      );
    case 1:
    default:
      return (
        <>
          <svg
            className="mx-auto"
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="48" height="48" rx="24" fill="#00AADD" />
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
        </>
      );
  }
};

/**
 * Displays current step in Onboarding layout.
 */
const Steps = ({ step, singleStepMode = true }) => {
  const Inside = () => {
    switch (step) {
      case 1:
        return <StepOne />;
      case 2:
      default:
        return <StepTwo />;
    }
  };
  return (
    <Main.Step>
      <div className="flex flex-col pt-12 w-full max-w-sm mx-auto">
        <Icon step={step} />
        <Inside />
      </div>
      <Main.StepBottom step={step} singleStepMode={singleStepMode} />
    </Main.Step>
  );
};

/**
 *
 * I removed .absolute from design to make it appear on the screen
 */
export const OnboardingLayout = ({
  //Which step to display
  currentStep = 2,
  //Set false to hide navigation to other steps.
  singleStepMode = true,
}) => {
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
                <Steps
                  currentStep={currentStep}
                  singleStepMode={singleStepMode}
                />
              </div>
              <aside
                className="hidden relative bg-gray-tl md:order-first md:flex md:flex-col flex-shrink-0 min-w-[26rem] overflow-y-auto"
                id={"trustedlogin-onboarding-side"}>
                <div className="inset-0">
                  <div className="h-full flex flex-col justify-between p-12">
                    <div className="space-y-16">
                      <div>
                        <HorizontalLogo />
                      </div>
                      <div
                        style={{
                          visibility: singleStepMode ? "hidden" : "inherit",
                        }}>
                        <nav aria-label="Progress">
                          <ol role="list" className="overflow-hidden">
                            <Aside.CurrentStep
                              title={"Link your account"}
                              subTitle={"Vitae sed mi luctus laoreet."}
                            />
                            <Aside.FutureStep
                              title={"Create Team"}
                              subTitle={
                                "Cursus semper viverra facilisis et et some more."
                              }
                            />
                            <Aside.FutureStep
                              title={"Configure Help Desk"}
                              subTitle={"Penatibus eu quis ante."}
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
