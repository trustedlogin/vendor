import { useMemo,Fragment,useEffect,useRef } from "react";
import { __ } from "@wordpress/i18n";
import { PageHeader } from "./Layout";
import { useSettings } from "../hooks/useSettings";

const Integration = ({ Icon, name, description,id }) => {

  const {settings,setSettings} = useSettings();

  const isEnabled = useMemo(() => {
    return settings.integrations[id].enabled || false;
  }, [settings.integrations]);

  const buttonClassName = useMemo(() => {
    let className = isEnabled ? "bg-blue-tl" : "bg-gray-200";
    return `${className} ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500`;
  }, [isEnabled]);

  const spanClassName = useMemo(() => {
    let className = isEnabled ? "translate-x-5" : "translate-x-0";
    return `${className} translate-x-5 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`;
  }, [isEnabled]);


  const onToggle = () => {
    setSettings({
      ...settings,
      integrations: {
        ...settings.integrations,
        [id]: {
          ...settings.integrations[id],
          enabled:!settings.integrations[id].enabled,
        }
      }
    });
    onSaveIntegrationSettings();
  };

  return (
    <li className="col-span-1 flex flex-col justify-between bg-white rounded-lg shadow divide-y divide-gray-200">
      <div className="p-6 space-y-6">
        <div className="w-full flex items-center justify-between space-x-6">
          <div className="flex-1 truncate">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Icon />
              </div>
              <div className="ml-5 w-0 flex-1" id={`${id}-label`} role={'label'}>{name}</div>
            </div>
          </div>
          <button
            onClick={() => onToggle()}
            type="button"
            className={buttonClassName}
            role="switch"
            aria-checked="true"
            aria-labelledby={`${id}-label`}
            aria-describedby={`${id}-description`}
          >
            <span aria-hidden="true" className={spanClassName} />
          </button>
        </div>
        <p className="text-sm text-gray-500" id={`${id}-description`}>{description}</p>
      </div>
    </li>
  );
};

const IntegrationSettings = () => {



  return (
    <div className="flex flex-col px-5 py-6 sm:px-10">
      <PageHeader title={"Integrations"} subTitle={"Manage Integrations"} />
      <div className="flex flex-col justify-center w-full bg-white rounded-lg shadow">
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <Fragment key="helpscout">
              <Integration
                id={"helpscout"}
                isEnabled={true}
                name={"Helpscout"}
                description={__(
                  "Customer support platform, knowledge base tool, and an contact widget for customer service.",
                  "trustedlogin-vendor"
                )}
                Icon={() =>
                  (<svg
                    width="40"
                    height="48"
                    viewBox="0 0 40 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16.9209 14.1817L3.03705 28.3637C1.30192 26.5909 0.217179 24.1535 0 21.2726C0 18.6137 1.30163 15.9546 3.03705 14.1817L17.1381 0C18.8735 1.77286 19.958 4.43172 19.958 7.09086C19.958 9.75001 18.6567 12.4092 16.9212 14.1817H16.9209ZM23.0285 33.8183L37.0644 19.6363C38.8191 21.6306 39.916 24.0683 39.916 26.7271C39.916 29.3863 38.5997 32.0454 36.8455 33.8183L22.809 48C21.0545 46.2271 19.958 43.568 19.958 40.9091C19.958 38.25 21.2737 35.5908 23.0285 33.8183ZM22.6843 14.1817L26.8285 10.0363L37.0803 0C38.8252 1.7455 39.9157 4.36374 39.9157 6.98199C39.9157 9.60023 38.6072 12.2182 36.8619 13.9637L26.8285 24L22.6843 28.1454L16.7954 34.0363L12.6511 38.1817L2.83571 48C1.0905 46.2545 0 43.6363 0 41.018C0 38.3998 1.30883 35.7815 3.05375 34.0363L12.8691 24.218L16.7951 20.0726L22.6843 14.1817Z"
                      fill="#1292EE"
                    />
                  </svg>)
                }
              />
            </Fragment>

        </ul>
      </div>
    </div>
  );
};
export default IntegrationSettings;
