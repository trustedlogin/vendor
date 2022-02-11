import { SecondaryButton } from ".";
import { HorizontalLogo } from "./TrustedLoginLogo";
import { useState } from "react";
export const TopBar = ({ status }) => {
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isHelpMenuOpen, setIsHelpMenuOpen] = useState(false);
  const toggleStatus = () => setIsStatusOpen(!isStatusOpen);
  const toggleHelpMenu = () => setIsHelpMenuOpen(!isHelpMenuOpen);

  //Removed sm:-left-24 from popover
  return (
    <>
      <div className="bg-white flex flex-1 auto justify-between items-center px-5 py-8 shadow-lg sm:px-10">
        <div className="">
          <HorizontalLogo />
        </div>
        <div className="relative flex items-center space-x-2">
          <button
            onClick={toggleStatus}
            className="inline-flex items-center pl-2.5 pr-3 h-10 border border-gray-300 text-sm leading-4 rounded-lg text-gray-500 bg-white focus:outline-none focus:ring-2 ring-offset-2 focus:ring-sky-500">
            <svg
              className="text-green-700 sm:mr-2"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3.125 8.33336V3.75C3.125 3.58424 3.19085 3.42527 3.30806 3.30806C3.42527 3.19085 3.58424 3.125 3.75 3.125H16.25C16.4158 3.125 16.5747 3.19085 16.6919 3.30806C16.8092 3.42527 16.875 3.58424 16.875 3.75V8.33336C16.875 14.897 11.3042 17.0716 10.1919 17.4404C10.0675 17.4832 9.93246 17.4832 9.80812 17.4404C8.69578 17.0716 3.125 14.897 3.125 8.33336Z"
                stroke="#119A27"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13.4375 7.5L8.85414 11.875L6.5625 9.6875"
                stroke="#119A27"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span className="hidden sm:inline-flex">
              Status:
              <span className="mx-1 text-gray-900 font-medium">{status}</span>
            </span>
            <svg
              className="hidden sm:inline-flex ml-3"
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 1L5 5L9 1"
                stroke="#1D2327"
                stroke-opacity="0.5"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button className="inline-flex items-center px-3.5 h-10 border border-gray-300 text-sm leading-4 font-medium rounded-lg text-gray-900 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 ring-offset-2 focus:ring-sky-500">
            <svg
              className="-ml-0.5 h-4 w-4 sm:mr-2"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14 7C14 3.13 10.86 0 7 0C3.13 0 0 3.13 0 7C0 10.87 3.13 14 7 14C10.86 14 14 10.87 14 7ZM7.7 8.48H6.14V8.05C6.14 7.67 6.22 7.35 6.38 7.07C6.54 6.79 6.84 6.5 7.26 6.18C7.67 5.89 7.94 5.65 8.07 5.47C8.21 5.29 8.27 5.08 8.27 4.85C8.27 4.6 8.18 4.41 7.99 4.27C7.8 4.14 7.54 4.08 7.2 4.08C6.62 4.08 5.95 4.27 5.2 4.65L4.56 3.37C5.43 2.88 6.36 2.63 7.33 2.63C8.14 2.63 8.78 2.83 9.25 3.21C9.73 3.6 9.96 4.12 9.96 4.76C9.96 5.19 9.87 5.56 9.67 5.87C9.48 6.19 9.1 6.54 8.56 6.93C8.18 7.21 7.95 7.42 7.85 7.56C7.75 7.71 7.7 7.9 7.7 8.13V8.48ZM6.23 11.22C6.05 11.05 5.96 10.8 5.96 10.49C5.96 10.16 6.04 9.91 6.22 9.74C6.4 9.57 6.65 9.49 6.99 9.49C7.31 9.49 7.56 9.58 7.74 9.75C7.92 9.92 8.01 10.17 8.01 10.49C8.01 10.79 7.92 11.04 7.74 11.21C7.56 11.39 7.31 11.48 6.99 11.48C6.66 11.48 6.41 11.39 6.23 11.22Z"
                fill="currentColor"
              />
            </svg>
            <span className="hidden sm:inline-flex">Need Help?</span>
          </button>
        </div>
      </div>
      {isStatusOpen ? (
        <div
          id={"trustedlogin-status-popover"}
          className="absolute z-10 top-0 -right-52 -translate-x-1/2 transform translate-y-10 mt-3 px-2 w-[32rem]  sm:w-screen sm:max-w-xl">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="relative bg-white px-8 pb-6 space-y-8">
              <div className="flex py-6 border-b items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div>
                    <h2 className="leading-tight text-lg text-gray-900">
                      Mary Smith
                    </h2>
                    <p className="text-sm text-gray-500">
                      mary.smith@example.com
                    </p>
                  </div>
                </div>
                <button className="inline-flex items-center px-2.5 py-1.5 h-7 rounded-full text-xs font-medium border text-gray-900 focus:outline-none focus:ring-2 ring-offset-2 focus:ring-sky-500">
                  <svg
                    className="-ml-0.5 mr-1.5 h-2 w-2 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                  <span className="border-r pr-2 mr-2 leading-none">
                    Connected
                  </span>
                </button>
              </div>
              <div className="flex space-x-8">
                <div className="h-32 w-48 bg-gray-200 rounded-lg"></div>
                <div className="flex flex-col items-start justify-center">
                  <h4 className="text-gray-900">Account Settings</h4>
                  <p className="py-2 text-gray-500 text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <a
                    className="inline-block mt-2 text-sm text-blue-tl"
                    href="#">
                    View Settings
                  </a>
                </div>
              </div>
              <div className="mb-8 inline-flex items-center">
                <a className="text-sm text-blue-tl" href="#">
                  Need help? View our Documentation
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
      ) : null}
    </>
  );
};

export const PageHeader = ({ title, subTitle, Button }) => {
  return (
    <div className="pb-6 mb-6 border-b md:flex md:items-center md:justify-between md:space-x-5">
      <div className="flex items-center space-x-5">
        <div>
          <h2 className="text-2xl text-gray-900">{title}</h2>
          <p className="mt-1 text-sm text-gray-500">{subTitle}</p>
        </div>
      </div>
      <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
        {Button ? (
          <Button />
        ) : (
          <SecondaryButton
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 inline-flex items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 ring-offset-2 focus:ring-sky-500"
            id="sort-menu-button"
            isExpanded={false}
            hasPopup={true}>
            <svg
              className="text-gray-500 mr-2"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.0001 0.5H2.0001V2.5H10.0001C11.7001 2.5 13.0001 3.8 13.0001 5.5C13.0001 7.2 11.7001 8.5 10.0001 8.5H4.4001L7.4001 5.5L6.0001 4.1L0.600098 9.5L6.0001 14.9L7.4001 13.5L4.4001 10.5H10.0001C12.8001 10.5 15.0001 8.3 15.0001 5.5C15.0001 2.7 12.8001 0.5 10.0001 0.5Z"
                fill="currentColor"
              />
            </svg>
            Reset All
          </SecondaryButton>
        )}
      </div>
    </div>
  );
};

const Layout = ({ children }) => {
  return <div className="h-full overflow-hidden">{children}</div>;
};

export default Layout;
