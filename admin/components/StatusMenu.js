import {useSettings} from '../hooks/useSettings';
import {useMemo} from 'react';
import {__} from '@wordpress/i18n';
const Button = ({}) => {


}
const StatusMenu = ({toggleStatus}) => {

    return(
        <button>status</button>
    )
}
export const StatusMenuButton = ({toggleStatus}) => {
    const {settings} = useSettings();

    const teamsConnected = useMemo(() => {
        let count = 0;
        if( settings && settings.teams ){
            settings.teams.forEach(team => {
                if(team.connected) {
                    count++;
                }
            });
        }
        return count;
    }, [settings]);

    const totalTeams = useMemo(() => {
        if( settings && settings.teams ){
            return settings.teams.length;
        }
        return 0;
    }, [settings]);




    //All teams connected!
    if( teamsConnected === totalTeams) {
        return(
            <button
                onClick={toggleStatus}
                className="inline-flex items-center pl-2.5 pr-3 h-10 border border-gray-300 text-sm leading-4 rounded-lg text-gray-500 bg-white :outline-none ring-4 ring-blue-100">
                <svg className="mr-1" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="8" stroke="#119A27" strokeWidth="2"/>
                    <path d="M13.2857 8L9.09521 12L7 10" stroke="#119A27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="hidden sm:inline-flex">
                    <span className="mx-1 text-gray-900 font-medium">
                        {__('All teams connected', 'trustedlogin-vendor')}
                    </span>
                </span>
                <svg className="hidden sm:inline-flex ml-3" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5L5 1L9 5" stroke="#1D2327" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        );
    }

    //1 or more teams not connected
    return (
        <button
            onClick={toggleStatus}
            className="inline-flex items-center pl-2.5 pr-3 h-10 border border-gray-300 text-sm leading-4 rounded-lg text-gray-500 bg-white :outline-none ring-4 ring-blue-100">
            <svg className="sm:mr-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 10C6 8.93913 6.42143 7.92172 7.17157 7.17157C7.92172 6.42143 8.93913 6 10 6L10 10L6 10Z" fill="#FFB000"/>
                <circle cx="10" cy="10" r="8" stroke="#FFB000" strokeWidth="2"/>
            </svg>
            <span className="hidden sm:inline-flex">
                <span className="mx-1 text-gray-900 font-medium">
                    {`${teamsConnected} of ${totalTeams} Teams Connected`}
                </span>
            </span>
            <svg className="hidden sm:inline-flex ml-3" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 5L5 1L9 5" stroke="#1D2327" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </button>
    )




}

export default StatusMenu;
