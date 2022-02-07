const OnboardingLayout = ({currentStep,children}) => {

    return (
        <>
        <div className="bg-white flex flex-1 auto justify-between items-center px-5 py-8 shadow-lg sm:px-10">
            <div className="">Logo</div>
            <div className="relative flex items-center space-x-2">
                <button
                    className="inline-flex items-center pl-2.5 pr-3 h-10 border border-gray-300 text-sm leading-4 rounded-lg text-gray-500 bg-white focus:outline-none focus:ring-2 ring-offset-2 focus:ring-sky-500"
                >
                    <svg className="text-green-700 sm:mr-2" width="20" height="20" viewBox="0 0 20 20" fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M3.125 8.33336V3.75C3.125 3.58424 3.19085 3.42527 3.30806 3.30806C3.42527 3.19085 3.58424 3.125 3.75 3.125H16.25C16.4158 3.125 16.5747 3.19085 16.6919 3.30806C16.8092 3.42527 16.875 3.58424 16.875 3.75V8.33336C16.875 14.897 11.3042 17.0716 10.1919 17.4404C10.0675 17.4832 9.93246 17.4832 9.80812 17.4404C8.69578 17.0716 3.125 14.897 3.125 8.33336Z" stroke="#119A27" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M13.4375 7.5L8.85414 11.875L6.5625 9.6875" stroke="#119A27" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span className="hidden sm:inline-flex">Status:
                        <span className="mx-1 text-gray-900 font-medium">Connected</span>
                    </span>
                    <svg className="hidden sm:inline-flex ml-3" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L9 1" stroke="#1D2327" stroke-opacity="0.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <button className="inline-flex items-center px-3.5 h-10 border border-gray-300 text-sm leading-4 font-medium rounded-lg text-gray-900 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 ring-offset-2 focus:ring-sky-500">
                    <svg  className="-ml-0.5 h-4 w-4 sm:mr-2" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 7C14 3.13 10.86 0 7 0C3.13 0 0 3.13 0 7C0 10.87 3.13 14 7 14C10.86 14 14 10.87 14 7ZM7.7 8.48H6.14V8.05C6.14 7.67 6.22 7.35 6.38 7.07C6.54 6.79 6.84 6.5 7.26 6.18C7.67 5.89 7.94 5.65 8.07 5.47C8.21 5.29 8.27 5.08 8.27 4.85C8.27 4.6 8.18 4.41 7.99 4.27C7.8 4.14 7.54 4.08 7.2 4.08C6.62 4.08 5.95 4.27 5.2 4.65L4.56 3.37C5.43 2.88 6.36 2.63 7.33 2.63C8.14 2.63 8.78 2.83 9.25 3.21C9.73 3.6 9.96 4.12 9.96 4.76C9.96 5.19 9.87 5.56 9.67 5.87C9.48 6.19 9.1 6.54 8.56 6.93C8.18 7.21 7.95 7.42 7.85 7.56C7.75 7.71 7.7 7.9 7.7 8.13V8.48ZM6.23 11.22C6.05 11.05 5.96 10.8 5.96 10.49C5.96 10.16 6.04 9.91 6.22 9.74C6.4 9.57 6.65 9.49 6.99 9.49C7.31 9.49 7.56 9.58 7.74 9.75C7.92 9.92 8.01 10.17 8.01 10.49C8.01 10.79 7.92 11.04 7.74 11.21C7.56 11.39 7.31 11.48 6.99 11.48C6.66 11.48 6.41 11.39 6.23 11.22Z" fill="currentColor"/>
                    </svg>
                    <span className="hidden sm:inline-flex">Need Help?</span>
                </button>
            </div>
        </div>
        <div className="flex flex-col px-5 py-6 sm:px-10">
            <!-- Page header -->
            <div className="pb-6 mb-6 border-b md:flex md:items-center md:justify-between md:space-x-5">
                <div className="flex items-center space-x-5">
                    <div>
                        <h2 className="text-2xl text-gray-900">Settings</h2>
                    <p className="mt-1 text-sm text-gray-500">Manage your TrustedLogin settings</p>
                    </div>
                </div>
                <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
                    <button type="button" className="bg-white border border-gray-300 rounded-lg px-4 py-2 inline-flex items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 ring-offset-2 focus:ring-sky-500" id="sort-menu-button" aria-expanded="false" aria-haspopup="true">
                        <svg className="text-gray-500 mr-2" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.0001 0.5H2.0001V2.5H10.0001C11.7001 2.5 13.0001 3.8 13.0001 5.5C13.0001 7.2 11.7001 8.5 10.0001 8.5H4.4001L7.4001 5.5L6.0001 4.1L0.600098 9.5L6.0001 14.9L7.4001 13.5L4.4001 10.5H10.0001C12.8001 10.5 15.0001 8.3 15.0001 5.5C15.0001 2.7 12.8001 0.5 10.0001 0.5Z" fill="currentColor"/>
                        </svg>
                        Reset All
                    </button>
                </div>
            </div>
            <!-- Sections -->
            <div className="space-y-6">
                <!-- Account Info -->
                <div className="flex flex-col justify-center w-full bg-white p-8 rounded-lg shadow">
                    <div className="md:flex md:items-center md:justify-between md:space-x-5">
                        <div className="flex items-center space-x-5">
                            <div className="flex-shrink-0">
                                <img className="h-14 w-14 rounded-full" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                            </div>
                            <div>
                                <h2 className="leading-tight text-xl text-gray-900">Mary Smith</h2>
                                <p className="text-sm text-gray-500">mary.smith@example.com</p>
                            </div>
                        </div>
                        <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3 focus:outline-none focus:ring-2 ring-offset-2 focus:ring-sky-500">
                            <button type="button" className="bg-white border border-gray-300 rounded-lg px-4 py-2 inline-flex items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 ring-offset-2 focus:ring-sky-500" id="sort-menu-button" aria-expanded="false" aria-haspopup="true">
                                View Account
                                <svg className="ml-2 text-gray-500" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.8335 10.1666L10.1668 1.83325M10.1668 1.83325H1.8335M10.1668 1.83325V10.1666" stroke="currentColor" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                            <button type="button" className="bg-white border border-gray-300 rounded-lg px-4 py-2 inline-flex items-center justify-center text-sm font-medium text-red-700 hover:bg-gray-50 focus:outline-none focus:ring-2 ring-offset-2 focus:ring-red-700" id="sort-menu-button" aria-expanded="false" aria-haspopup="true">
                                Disconnect Account
                            </button>
                        </div>
                    </div>
                </div>
                <!-- Settings Section - Logging -->
                <div className="flex flex-col justify-center w-full bg-white p-8 pb-0 rounded-lg shadow">
                    <div className="flex items-center space-x-5">
                        <div>
                            <h2 className="text-xl text-gray-900">Logging</h2>
                        <p className="mt-1 text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>
                    <ul role="list" className="divide-y divide-gray-200">
                        <li className="py-8 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center justify-center h-12 w-12 border border-gray-300 rounded-lg">
                                    <svg className="text-gray-900" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 7V23" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M1 13H4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M4 5L6.1 7.1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M19.9999 5L17.8999 7.1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M4 21.9999L6.1 19.8999" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M19.9999 21.9999L17.8999 19.8999" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M20 13H23" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M9 3L7 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M15 3L17 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M15.9 5.19995C18.4 6.79995 20 9.89995 20 13.5C20 18.7 16.4 23 12 23C7.6 23 4 18.7 4 13.5C4 9.89995 5.7 6.79995 8.1 5.19995" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M12 2C10 2 8.3 3.5 8 5.5C8 5.5 10 7 12 7C14 7 16 5.5 16 5.5C15.7 3.5 14 2 12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-medium text-gray-900" id="logging-option-1-label">
                                        Debug Logging
                                    </p>
                                    <p className="text-sm text-gray-500" id="logging-option-1-description">
                                        When enabled, logs will be saved to the
                                    </p>
                                </div>
                            </div>
                            <!-- Enabled: "bg-teal-500", Not Enabled: "bg-gray-200" -->
                            <button type="button" className="bg-gray-200 ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500" role="switch" aria-checked="true" aria-labelledby="logging-option-1-label" aria-describedby="logging-option-1-description">
                                <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
                                <span aria-hidden="true" className="translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                            </button>
                        </li>
                        <li className="py-8 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center justify-center h-12 w-12 border border-gray-300 rounded-lg">
                                    <svg className="text-gray-900" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.1001 16C9.5001 18.4 12.1001 20 15.0001 20C19.4001 20 23.0001 16.4 23.0001 12C23.0001 7.6 19.4001 4 15.0001 4C12.0001 4 9.5001 5.6 8.1001 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M1 12H18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M15 9L18 12L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-medium text-gray-900" id="logging-option-2-label">
                                        Activity Log
                                    </p>
                                    <p className="text-sm text-gray-500" id="logging-option-2-description">
                                        Activity Log shows a log of users attempting to log into customer sites using access keys.
                                    </p>
                                </div>
                            </div>
                            <!-- Enabled: "bg-teal-500", Not Enabled: "bg-gray-200" -->
                            <button type="button" className="bg-blue-tl ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500" role="switch" aria-checked="true" aria-labelledby="logging-option-2-label" aria-describedby="logging-option-2-description">
                                <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
                                <span aria-hidden="true" className="translate-x-5 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                            </button>
                        </li>
                    </ul>
                </div>
                <!-- Settings Section - Danger Zone -->
                <div className="flex flex-col justify-center w-full bg-white p-8 rounded-lg shadow space-y-8">
                    <div className="flex items-center space-x-5">
                        <div>
                            <h2 className="text-xl text-red-700">Danger Zone</h2>
                            <p className="mt-1 text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>
                    <div className="bg-white p-8 border border-red-700 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center justify-center h-12 w-12 bg-red-700 rounded-lg">
                                    <svg className="text-white" width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.65 4C10.83 1.67 8.61 0 6 0C2.69 0 0 2.69 0 6C0 9.31 2.69 12 6 12C8.61 12 10.83 10.33 11.65 8H16V12H20V8H22V4H11.65ZM6 8C4.9 8 4 7.1 4 6C4 4.9 4.9 4 6 4C7.1 4 8 4.9 8 6C8 7.1 7.1 8 6 8Z" fill="currentColor"/>
                                    </svg>
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-medium text-gray-900" id="dangerzone-option-1-label">
                                        Reset encryption keys?
                                    </p>
                                    <p className="text-sm text-gray-500" id="dangerzone-option-1-description">
                                        If you reset the encryption keys, all previous authorized logins will be inaccessible.
                                    </p>
                                </div>
                            </div>
                            <button type="button" className="bg-white border border-red-700 rounded-lg px-4 py-2 inline-flex items-center justify-center text-sm font-medium text-red-700 hover:bg-gray-50 focus:outline-none focus:ring-2 ring-offset-2 focus:ring-red-700" id="sort-menu-button" aria-expanded="false" aria-haspopup="true">
                                Reset Keys
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
