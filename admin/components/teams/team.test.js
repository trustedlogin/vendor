import AddTeam from "./AddTeam";
import {render} from '@testing-library/react';
import ViewProvider from "../../hooks/useView";
import SettingsProvider from "../../hooks/useSettings";
import NoTeams from "./NoTeams";

const Provider = ({ children }) => (
    <SettingsProvider>
        <ViewProvider>
            {children}

        </ViewProvider>

    </SettingsProvider>
);
const team ={
account_id: "1",
private_key: "asda",
public_key: "fsaffff",
helpdesk: "HelpScout",
approved_roles: [],
}
describe( 'AddTeam', () => {
    it( 'Renders & Matches snapshot', () => {
        const {container} =render(<Provider>
            <AddTeam />
        </Provider>);
        expect( container ).toMatchSnapshot();
    });
})
