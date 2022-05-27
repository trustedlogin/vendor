const SettingSection = ({ title, subTitle, children }) => {
  return (
    <div className="flex flex-col justify-center w-full bg-white p-8 pb-0 rounded-lg shadow">
      <div className="flex items-center space-x-5">
        <div>
          <h2 className="text-xl text-gray-900">{title}</h2>
          <p className="mt-1 text-sm text-gray-500">{subTitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default SettingSection;
