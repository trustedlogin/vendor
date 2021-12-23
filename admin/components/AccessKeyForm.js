import { useMemo, useState } from "react";
import { __ } from "@wordpress/i18n";
import { FormTable, Input, Select, Form} from "./index";


const AccessKeyForm = ({initialAccountId,teams}) => {
    const [accountId,setAccountId] = useState(initialAccountId);
    const [accessKey,setAccessKey] = useState("");
    const teamsOption = useMemo(() => {
            return teams.map(t => {
                return {
                    label: t.account_id,
                    value: t.account_id,
                };
            })
    }, [teams]);
    <FormTable title={'Loging To Site Using Access Key'}>
        <Form>
            <Input label={__("Access Key")}
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
        </Form>

    </FormTable>

};

export default AccessKeyForm;
