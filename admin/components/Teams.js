const Teams = {
  Add: () => (
    <>
      <div className="bg-white flex flex-1 auto justify-between items-center px-5 py-8 shadow-lg sm:px-10">
        <div className="">Logo</div>
        <div className="relative flex items-center space-x-2">
          <button className="inline-flex items-center pl-2.5 pr-3 h-10 border border-gray-300 text-sm leading-4 rounded-lg text-gray-500 bg-white focus:outline-none focus:ring-2 ring-offset-2 focus:ring-sky-500">
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
              <span className="mx-1 text-gray-900 font-medium">Connected</span>
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
      <div className="flex px-5 pt-20 sm:px-10">
        <div className="flex flex-col w-full max-w-4xl mx-auto p-8 bg-white rounded-lg shadow sm:p-14 sm:pb-8">
          <svg
            className="mx-auto"
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="48" height="48" rx="24" fill="#00AADD" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M28 26C26.9391 26 25.9217 25.5786 25.1716 24.8284C24.4214 24.0783 24 23.0609 24 22C24 20.9391 24.4214 19.9217 25.1716 19.1716C25.9217 18.4214 26.9391 18 28 18C29.0609 18 30.0783 18.4214 30.8284 19.1716C31.5786 19.9217 32 20.9391 32 22C32 23.0609 31.5786 24.0783 30.8284 24.8284C30.0783 25.5786 29.0609 26 28 26ZM22 36C20.9391 36 19.9217 35.5786 19.1716 34.8284C18.4214 34.0783 18 33.0609 18 32C18 30.9391 18.4214 29.9217 19.1716 29.1716C19.9217 28.4214 20.9391 28 22 28C23.0609 28 24.0783 28.4214 24.8284 29.1716C25.5786 29.9217 26 30.9391 26 32C26 33.0609 25.5786 34.0783 24.8284 34.8284C24.0783 35.5786 23.0609 36 22 36V36ZM34 36C32.9391 36 31.9217 35.5786 31.1716 34.8284C30.4214 34.0783 30 33.0609 30 32C30 30.9391 30.4214 29.9217 31.1716 29.1716C31.9217 28.4214 32.9391 28 34 28C35.0609 28 36.0783 28.4214 36.8284 29.1716C37.5786 29.9217 38 30.9391 38 32C38 33.0609 37.5786 34.0783 36.8284 34.8284C36.0783 35.5786 35.0609 36 34 36Z"
              stroke="white"
              stroke-width="2"
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
            <h2 className="mt-4 text-2xl text-gray-900">Add Team</h2>
            <p className="mt-2 mb-4 text-sm text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              ornare tortor in nisl fermentum.
            </p>
            <a className="text-blue-tl text-sm" href="#">
              Where can I find this info?
            </a>
          </div>
          <div className="flex flex-col py-6 space-y-6 sm:space-y-0 sm:space-x-12 sm:flex-row">
            <div className="flex flex-col space-y-6 sm:flex-1">
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
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
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
                    className="block w-full pl-3 pr-10 py-2.5 sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 ring-offset-2 focus:ring-sky-500"
                    placeholder=""
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
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
                  for="private-key"
                  className="block text-sm font-medium text-gray-700">
                  Private Key
                </label>
                <div className="mt-2 relative rounded-lg">
                  <input
                    type="text"
                    name="private-key"
                    id="private-key"
                    className="block w-full pl-3 pr-10 py-2.5 sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 ring-offset-2 focus:ring-sky-500"
                    placeholder=""
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
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
            </div>
            <div className="flex flex-col space-y-6 sm:flex-1">
              <div className="">
                <label
                  for="support-roles"
                  className="block text-sm font-medium text-gray-700">
                  What Roles Provide Support?
                </label>
                <div className="mt-2">
                  <select
                    id="support-roles"
                    name="support-roles"
                    autocomplete="support-roles"
                    className="bg-white block w-full pl-3 pr-8 py-2.5 sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 ring-offset-2 focus:ring-sky-500">
                    <option>Select Roles</option>
                    <option>Administrator</option>
                    <option>Editor</option>
                    <option>Contributor</option>
                  </select>
                </div>
              </div>
              <div className="">
                <label
                  for="help-desks"
                  className="block text-sm font-medium text-gray-700">
                  Help Desk
                </label>
                <div className="mt-2">
                  <select
                    id="help-desks"
                    name="help-desks"
                    autocomplete="help-desks"
                    className="bg-white block w-full pl-3 pr-8 py-2.5 sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 ring-offset-2 focus:ring-sky-500">
                    <option>Select a Help Desk</option>
                    <option>Help Scout</option>
                    <option>Zendesk</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8 mt-4 border-t">
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-white py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 ring-offset-2 focus:ring-sky-500">
                Cancel
              </button>
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-tl hover:bg-indigo-700 focus:outline-none focus:ring-2 ring-offset-2 focus:ring-sky-500">
                Create Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  ),
  Empty: () => (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="bg-white flex flex-1 auto justify-between items-center px-5 py-8 shadow-lg sm:px-10">
          <div className="">Logo</div>
          <div className="relative flex items-center space-x-2">
            <button className="inline-flex items-center pl-2.5 pr-3 h-10 border border-gray-300 text-sm leading-4 rounded-lg text-gray-500 bg-white focus:outline-none focus:ring-2 ring-offset-2 focus:ring-sky-500">
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
                <span className="mx-1 text-gray-900 font-medium">
                  Connected
                </span>
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
      </div>
      <div className="flex px-5 pt-12 sm:px-10 sm:pt-32">
        <div className="flex flex-col justify-center text-center w-full max-w-lg mx-auto p-8 bg-white rounded-lg shadow sm:p-14">
          <svg
            className="mx-auto"
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="48" height="48" rx="24" fill="#00AADD" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M28 26C26.9391 26 25.9217 25.5786 25.1716 24.8284C24.4214 24.0783 24 23.0609 24 22C24 20.9391 24.4214 19.9217 25.1716 19.1716C25.9217 18.4214 26.9391 18 28 18C29.0609 18 30.0783 18.4214 30.8284 19.1716C31.5786 19.9217 32 20.9391 32 22C32 23.0609 31.5786 24.0783 30.8284 24.8284C30.0783 25.5786 29.0609 26 28 26ZM22 36C20.9391 36 19.9217 35.5786 19.1716 34.8284C18.4214 34.0783 18 33.0609 18 32C18 30.9391 18.4214 29.9217 19.1716 29.1716C19.9217 28.4214 20.9391 28 22 28C23.0609 28 24.0783 28.4214 24.8284 29.1716C25.5786 29.9217 26 30.9391 26 32C26 33.0609 25.5786 34.0783 24.8284 34.8284C24.0783 35.5786 23.0609 36 22 36V36ZM34 36C32.9391 36 31.9217 35.5786 31.1716 34.8284C30.4214 34.0783 30 33.0609 30 32C30 30.9391 30.4214 29.9217 31.1716 29.1716C31.9217 28.4214 32.9391 28 34 28C35.0609 28 36.0783 28.4214 36.8284 29.1716C37.5786 29.9217 38 30.9391 38 32C38 33.0609 37.5786 34.0783 36.8284 34.8284C36.0783 35.5786 35.0609 36 34 36Z"
              stroke="white"
              stroke-width="2"
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
          <h2 className="mt-4 text-2xl text-gray-900">
            Create your first team
          </h2>
          <p className="mt-2 mb-8 text-sm text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare
            tortor in nisl fermentum.
          </p>
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-lg text-white bg-blue-tl focus:outline-none focus:ring-2 ring-offset-2 focus:ring-sky-500 sm:text-sm">
            <svg
              className="mr-1"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24">
              <g fill="none">
                <path
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  stroke="#FFFFFF"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"></path>
              </g>
            </svg>
            Add Team
          </button>
        </div>
      </div>
    </>
  ),
};

export default Teams;
