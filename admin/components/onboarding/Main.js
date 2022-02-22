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

export default Main;
