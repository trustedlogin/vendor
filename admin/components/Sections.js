import { useMemo,useState } from "react";
import SettingSection from "./SettingSection";

const ToggleSwitch = ({isEnabled, onClick,labeledBy,describedBy}) => {
    const buttonClasses = useMemo( () => {
        let  classes = 'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500';
        if( isEnabled){
            classes = `bg-teal-500 ${classes}`;
        }else{
            classes = `bg-gray-200 ${classes}`;
        }
        return classes;
    },[isEnabled]);

    const spanClasses = useMemo( () => {

        let classes = 'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200';
        if( isEnabled){
            classes = `translate-x-5 ${classes}`;
        }else{
            classes = `translate-x-0 ${classes}`;
        }
        return classes;
    },[isEnabled]);


    return (
        <button
            onClick={(e)=> {
                e.preventDefault();
                onClick();
            }}
            type="button"
            className={buttonClasses}
            role="switch"
            aria-checked={isEnabled}
            aria-labelledby={labeledBy}
            aria-describedby={describedBy}
        >
            <span
                aria-hidden="true"
                className={spanClasses}>
            </span>
        </button>
    );
}

export const DebugLogSettings = () => {
    const [enabled,setEnabled] = useState({debug:false,activity:false});

    return (
        <SettingSection
            title={'Logging'}
            subTitle={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
        >
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
                            <p className="font-medium text-gray-900" id="debug-option-label">
                                Debug Logging
                            </p>
                            <p className="text-sm text-gray-500" id="debug-option-description">
                                When enabled, logs will be saved to the
                            </p>
                        </div>
                    </div>
                    <ToggleSwitch
                        isEnabled={enabled.debug}
                        onClick={() => {
                            setEnabled({...enabled,debug:!enabled.debug});
                        }}
                        labelledBy="debug-option-label"
                        aria-describedBy="debug-option-description"
                    />

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
                            <p className="font-medium text-gray-900" id="activity-log-label">
                                Activity Log
                            </p>
                            <p className="text-sm text-gray-500" id="activity-log-description">
                                Activity Log shows a log of users attempting to log into customer sites using access keys.
                            </p>
                        </div>
                    </div>
                    <ToggleSwitch
                        isEnabled={enabled.activity}
                        onClick={() => {
                            setEnabled({...enabled,activity:!enabled.activity});
                        }}
                        labelledBy="activity-log-label"
                        aria-describedBy="activity-log-description"
                    />

                </li>
            </ul>
        </SettingSection>
    );
}
