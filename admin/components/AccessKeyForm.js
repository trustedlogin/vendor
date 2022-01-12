import { useMemo, useState,useEffect } from "react";
import { __ } from "@wordpress/i18n";
import { FormTable, Input, Select, Form,BigButton} from "./index";


const AccessKeyForm = ({initialAccountId,teams}) => {
    const [accountId,setAccountId] = useState(initialAccountId);
    const [accessKey,setAccessKey] = useState("");
    const teamsOption = useMemo(() => {
        if(!teams){
            return [];
        }
        return teams.map(t => {
            return {
                label: t.account_id,
                value: t.account_id,
            };
        })
    }, [teams]);
    const action = useMemo(() => {
        const actions = window.tlVendor.accesKeyActions;
        return actions.hasOwnProperty(accountId) ? actions[accountId] : null;
    }, [teams,accountId]);
    console.log({action})
    useEffect(() => {
        setAccountId(initialAccountId);
    }, [initialAccountId,setAccountId]);
    if( !action ){
        return null;
    }
    return(
        <Form
            method={'GET'}
            action={action}
            onSubmit={e => {
                const provider = 'helpscout';
                let tlaction = 'accesskey_login';//tl_access_key_login
                let redirect = action.split("?trustedlogin")[0] + `?trustedlogin=1&action=${tlaction}&provider=${provider}&ak_account_id=${accountId}&ak=${accessKey}`;
                e.preventDefault();
                window.location = redirect;
            }}
        >
            <FormTable
                title={'Loging To Site Using Access Key'}
            >
                <>
                    <Input
                        label={__("Access Key")}
                        name="access_key"
                        value={accessKey}
                        onChange={(value) => setAccessKey(value)}
                    />
                    {! initialAccountId ? (
                        <Select
                            label={__("Account ID")}
                            value={accountId}
                            onChange={(value) => setAccountId(value)} name="account_id"
                            options={teamsOption}
                        />
                    ) : <input type="hidden" name="account_id" value={accountId} />}

                </>
                <BigButton type="submit" variant={'primary'}>{__("Login")}</BigButton>
            </FormTable>
        </Form>
    );

};

export default AccessKeyForm;
