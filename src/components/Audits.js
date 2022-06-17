import { Fragment } from "react";
import { PageHeader } from "./Layout";
import { DangerZone, DebugLogSettings } from "./Sections";
import { __ } from "@wordpress/i18n";
import { useSettings } from "../hooks/useSettings";
import DatePicker from "react-date-picker";

const Audits = () => {
  const stat = {
    totalLogins: 0,
    //percentage
    totalLoginsIncreasedBy: 40,
    succesfulLogins: 0,
    //percentage
    succesfulLoginsIncreasedBy: 40,
    users: 12,
  };

  const [search, setSearch] = useState(() => {
    let startDate = new Date();
    let endDate = new Date(startDate.getTime());
    endDate.setMonth(startDate.getMonth() - 6);
    return {
      term: "",
      startDate,
      endDate,
    };
  });
  return (
    <Fragment>
      <div className="flex flex-col px-5 py-6 sm:px-10">
        <div className="mb-8">
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <div className="flex flex-row justify-between sm:flex-col md:flex-row">
                <div>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Logins
                  </dt>
                  <dd className="mt-1 block justify-between items-baseline md:flex">
                    <div className="flex items-baseline text-4xl font-semibold">
                      {stat.totalLogins}
                    </div>
                  </dd>
                </div>
                <div className="flex flex-col items-end justify-between sm:flex-row-reverse sm:mt-4 md:flex-col md:mt-0">
                  <div>
                    <button
                      type="button"
                      className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      id="options-menu-0-button"
                      aria-expanded="false"
                      aria-haspopup="true">
                      <span className="sr-only">Open options</span>
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 mt-4 md:mt-0">
                    <svg
                      className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true">
                      <path
                        fill-rule="evenodd"
                        d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"></path>
                    </svg>
                    <span className="sr-only">Increased by</span>
                    {stat.totalLoginsIncreasedBy}%
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <div className="flex flex-row justify-between sm:flex-col md:flex-row">
                <div>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Successful Logins
                  </dt>
                  <dd className="mt-1 block justify-between items-baseline md:flex">
                    <div className="flex items-baseline text-4xl font-semibold">
                      {stat.succesfulLogins}
                    </div>
                  </dd>
                </div>
                <div className="flex flex-col items-end justify-between sm:flex-row-reverse sm:mt-4 md:flex-col md:mt-0">
                  <div>
                    <button
                      type="button"
                      className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      id="options-menu-0-button"
                      aria-expanded="false"
                      aria-haspopup="true">
                      <span className="sr-only">Open options</span>
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 mt-4 md:mt-0">
                    <svg
                      className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true">
                      <path
                        fill-rule="evenodd"
                        d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"></path>
                    </svg>
                    <span className="sr-only">Increased by</span>
                    {stats.succesfulLoginsIncreasedBy}%
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <div className="flex flex-row justify-between sm:flex-col md:flex-row">
                <div>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Users
                  </dt>
                  <dd className="mt-1 block justify-between items-baseline md:flex">
                    <div className="flex items-baseline text-4xl font-semibold">
                      {stat.users}
                    </div>
                  </dd>
                </div>
                <div className="flex flex-col items-end justify-between sm:flex-row-reverse sm:mt-4 md:flex-col md:mt-0">
                  <div>
                    <button
                      type="button"
                      className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      id="options-menu-0-button"
                      aria-expanded="false"
                      aria-haspopup="true">
                      <span className="sr-only">Open options</span>
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="flex -space-x-1 overflow-hidden">
                    <img
                      className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                      src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                      alt=""
                    />
                    <img
                      className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                      src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                      alt=""
                    />
                    <img
                      className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2.25&amp;w=256&amp;h=256&amp;q=80"
                      alt=""
                    />
                    <img
                      className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </dl>
        </div>

        <div className="mb-8 md:flex md:items-center md:justify-between md:space-x-5">
          <div className="flex flex-col items-center space-y-4 sm:space-y-0 sm:space-x-5 sm:flex-row">
            <div>
              <h2 className="text-2xl text-gray-900">Activity Log</h2>
            </div>
            <div className="w-full h-12 sm:w-auto sm:h-auto">
              <label for="search" className="sr-only">
                Search...
              </label>
              <div className="relative h-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true">
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"></path>
                  </svg>
                </div>
                <input
                  id="search"
                  name="search"
                  className="text-sm block w-full h-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-0 focus:ring-2 focus:ring-sky-500 sm:text-sm"
                  placeholder="Search..."
                  type="search"
                />
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:mt-6 sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
            <div>
              <div className="relative flex flex-row bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-10 p-2.5">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24">
                    <g fill="none">
                      <path
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"></path>
                    </g>
                  </svg>
                </div>
                <div className="flex justify-between w-full">
                  <label htmlFor="start-date" className="sr-only">
                    Start Date
                  </label>
                  <DatePicker
                    onChange={(value) => {
                      setSearch({ ...search, startDate: value });
                    }}
                    value={search.startDate}
                    id="start-date"
                    name="start-date"
                    type="text"
                    className="text-sm font-medium h-5 w-[5.2rem] bg-transparent p-0 outline-none border-none focus:ring-2 ring-offset-2 focus:ring-sky-500"
                    placeholder="Start date"
                  />
                  <span className="mx-2">-</span>
                  <label htmlFor="end-date" className="sr-only">
                    End Date
                  </label>
                  <DatePicker
                    onChange={(value) => {
                      setSearch({ ...search, endDate: value });
                    }}
                    value={search.endDate}
                    id="end-date"
                    name="end-date"
                    type="text"
                    className="text-sm font-medium h-5 w-[8rem] sm:w-[5.4rem] bg-transparent p-0 outline-none border-none focus:ring-2 ring-offset-2 focus:ring-sky-500"
                    placeholder="End date"
                  />
                </div>
              </div>
            </div>
            <button
              type="button"
              className="bg-white border border-gray-300 rounded-lg px-4 py-3 sm:py-2.5 inline-flex items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:focus:ring-sky-500"
              id="sort-menu-button"
              aria-expanded="false"
              aria-haspopup="true">
              <svg
                className="text-gray-500 mr-2"
                width="18"
                height="14"
                viewBox="0 0 18 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4 6.5H14M1.5 1.5H16.5M6.5 11.5H11.5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"></path>
              </svg>
              Filters
            </button>
          </div>
        </div>

        <div className="block">
          <div className="mx-auto">
            <div className="flex flex-col mt-2">
              <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                        Date
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer">
                        Amount
                        <svg
                          className="ml-1 -mt-0.5 inline self-center h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true">
                          <path
                            fill-rule="evenodd"
                            d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"></path>
                        </svg>
                      </th>
                      <th className="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block cursor-pointer">
                        Site ID / Vault Secret ID
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="bg-white">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex">
                          <a
                            href="#"
                            className="group inline-flex space-x-2 truncate text-sm">
                            <p className="text-gray-500 truncate group-hover:text-gray-900">
                              Jan 6, 2022
                            </p>
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Rafael Bennemann
                      </td>
                      <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                        18sgyu5r78wegfiub
                      </td>
                      <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                        <time datetime="2020-07-11">Redirected</time>
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex">
                          <a
                            href="#"
                            className="group inline-flex space-x-2 truncate text-sm">
                            <p className="text-gray-500 truncate group-hover:text-gray-900">
                              Jan 6, 2022
                            </p>
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Rafael Bennemann
                      </td>
                      <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                        18sgyu5r78wegfiub
                      </td>
                      <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                        <time datetime="2020-07-11">Received</time>
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex">
                          <a
                            href="#"
                            className="group inline-flex space-x-2 truncate text-sm">
                            <p className="text-gray-500 truncate group-hover:text-gray-900">
                              Jan 6, 2022
                            </p>
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Rafael Bennemann
                      </td>
                      <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                        18sgyu5r78wegfiub
                      </td>
                      <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                        <time datetime="2020-07-11">Requested</time>
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex">
                          <a
                            href="#"
                            className="group inline-flex space-x-2 truncate text-sm">
                            <p className="text-gray-500 truncate group-hover:text-gray-900">
                              Jan 5, 2022
                            </p>
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Rafael Ehlers
                      </td>
                      <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                        18sgyu5r78wegfiub
                      </td>
                      <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                        <time datetime="2020-07-11">Redirected</time>
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex">
                          <a
                            href="#"
                            className="group inline-flex space-x-2 truncate text-sm">
                            <p className="text-gray-500 truncate group-hover:text-gray-900">
                              Jan 5, 2022
                            </p>
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Rafael Ehlers
                      </td>
                      <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                        18sgyu5r78wegfiub
                      </td>
                      <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                        <time datetime="2020-07-11">Received</time>
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex">
                          <a
                            href="#"
                            className="group inline-flex space-x-2 truncate text-sm">
                            <p className="text-gray-500 truncate group-hover:text-gray-900">
                              Jan 5, 2022
                            </p>
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Rafael Ehlers
                      </td>
                      <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                        18sgyu5r78wegfiub
                      </td>
                      <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                        <time datetime="2020-07-11">Requested</time>
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex">
                          <a
                            href="#"
                            className="group inline-flex space-x-2 truncate text-sm">
                            <p className="text-gray-500 truncate group-hover:text-gray-900">
                              Jan 4, 2022
                            </p>
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Terry Daniels
                      </td>
                      <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                        18sgyu5r78wegfiub
                      </td>
                      <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                        <time datetime="2020-07-11">Redirected</time>
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex">
                          <a
                            href="#"
                            className="group inline-flex space-x-2 truncate text-sm">
                            <p className="text-gray-500 truncate group-hover:text-gray-900">
                              Jan 4, 2022
                            </p>
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Terry Daniels
                      </td>
                      <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                        18sgyu5r78wegfiub
                      </td>
                      <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                        <time datetime="2020-07-11">Received</time>
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex">
                          <a
                            href="#"
                            className="group inline-flex space-x-2 truncate text-sm">
                            <p className="text-gray-500 truncate group-hover:text-gray-900">
                              Jan 4, 2022
                            </p>
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Terry Daniels
                      </td>
                      <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                        18sgyu5r78wegfiub
                      </td>
                      <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                        <time datetime="2020-07-11">Requested</time>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <nav
                  className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                  aria-label="Pagination">
                  <div className="hidden sm:block">
                    <p className="text-sm text-gray-700">
                      Page
                      <span className="font-medium">1</span>
                      of
                      <span className="font-medium">10</span>
                    </p>
                  </div>
                  <div className="flex-1 flex justify-between sm:justify-end">
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                      Previous
                    </button>
                    <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                      Next
                    </button>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Audits;
