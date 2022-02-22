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

export default Aside;
