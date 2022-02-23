import { useView } from "../../hooks/useView";
import { useRef } from "react";
import { InputField, SelectField, SelectFieldArea } from "./fields";
import teamFields from "./teamFields";
import collectTeam from "./collectTeam";
import { SubmitAndCanelButtons } from "../Buttons";
import RoleMultiSelect from "../RoleMultiSelect";

const EditTeam = ({ team = null, onClickSave, formTitle = "Update Team" }) => {
  const { setCurrentView } = useView();
  const formRef = useRef();
  const handleSave = (e) => {
    e.preventDefault();
    let team = collectTeam(formRef.current);
    onClickSave(team);
  };
  return (
    <>
      <form
        className="flex px-5 pt-20 sm:px-10"
        ref={formRef}
        onSubmit={handleSave}>
        <div className="flex flex-col w-full max-w-4xl mx-auto p-8 bg-white rounded-lg shadow sm:p-14 sm:pb-8">
          <svg
            className="mx-auto"
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="48" height="48" rx="24" fill="#00AADD" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M28 26C26.9391 26 25.9217 25.5786 25.1716 24.8284C24.4214 24.0783 24 23.0609 24 22C24 20.9391 24.4214 19.9217 25.1716 19.1716C25.9217 18.4214 26.9391 18 28 18C29.0609 18 30.0783 18.4214 30.8284 19.1716C31.5786 19.9217 32 20.9391 32 22C32 23.0609 31.5786 24.0783 30.8284 24.8284C30.0783 25.5786 29.0609 26 28 26ZM22 36C20.9391 36 19.9217 35.5786 19.1716 34.8284C18.4214 34.0783 18 33.0609 18 32C18 30.9391 18.4214 29.9217 19.1716 29.1716C19.9217 28.4214 20.9391 28 22 28C23.0609 28 24.0783 28.4214 24.8284 29.1716C25.5786 29.9217 26 30.9391 26 32C26 33.0609 25.5786 34.0783 24.8284 34.8284C24.0783 35.5786 23.0609 36 22 36V36ZM34 36C32.9391 36 31.9217 35.5786 31.1716 34.8284C30.4214 34.0783 30 33.0609 30 32C30 30.9391 30.4214 29.9217 31.1716 29.1716C31.9217 28.4214 32.9391 28 34 28C35.0609 28 36.0783 28.4214 36.8284 29.1716C37.5786 29.9217 38 30.9391 38 32C38 33.0609 37.5786 34.0783 36.8284 34.8284C36.0783 35.5786 35.0609 36 34 36Z"
              stroke="white"
              strokeWidth="2"
            />
            <rect
              x="4"
              y="4"
              width="48"
              height="48"
              rx="24"
              stroke="#CDEFF9"
              strokeWidth="8"
            />
          </svg>
          <div className="max-w-sm mx-auto mb-8 justify-center text-center">
            <h2 className="mt-4 text-2xl text-gray-900">{formTitle}</h2>
            <p className="mt-2 mb-4 text-sm text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              ornare tortor in nisl fermentum.
            </p>
            <a className="text-blue-tl text-sm" href="#">
              Where can I find this info?
            </a>
          </div>
          <div className="flex flex-col py-6 space-y-6 sm:space-y-0 sm:space-x-12 sm:flex-row">
            <div className="flex flex-col space-y-6 sm:flex-1">
              <InputField
                type="text"
                name={teamFields.account_id.id}
                id={teamFields.account_id.id}
                label={teamFields.account_id.label}
                defaultValue={team?.account_id}
                icon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.06004 6.00004C6.21678 5.55449 6.52614 5.17878 6.93334 4.93946C7.34055 4.70015 7.8193 4.61267 8.28483 4.69252C8.75035 4.77236 9.17259 5.01439 9.47676 5.37573C9.78093 5.73706 9.94741 6.19439 9.94671 6.66671C9.94671 8.00004 7.94671 8.66671 7.94671 8.66671M8.00004 11.3334H8.00671M14.6667 8.00004C14.6667 11.6819 11.6819 14.6667 8.00004 14.6667C4.31814 14.6667 1.33337 11.6819 1.33337 8.00004C1.33337 4.31814 4.31814 1.33337 8.00004 1.33337C11.6819 1.33337 14.6667 4.31814 14.6667 8.00004Z"
                      stroke="#98A2B3"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              />
              <InputField
                type="text"
                name={teamFields.public_key.id}
                id={teamFields.public_key.id}
                label={teamFields.public_key.label}
                defaultValue={team?.public_key}
                icon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.06004 6.00004C6.21678 5.55449 6.52614 5.17878 6.93334 4.93946C7.34055 4.70015 7.8193 4.61267 8.28483 4.69252C8.75035 4.77236 9.17259 5.01439 9.47676 5.37573C9.78093 5.73706 9.94741 6.19439 9.94671 6.66671C9.94671 8.00004 7.94671 8.66671 7.94671 8.66671M8.00004 11.3334H8.00671M14.6667 8.00004C14.6667 11.6819 11.6819 14.6667 8.00004 14.6667C4.31814 14.6667 1.33337 11.6819 1.33337 8.00004C1.33337 4.31814 4.31814 1.33337 8.00004 1.33337C11.6819 1.33337 14.6667 4.31814 14.6667 8.00004Z"
                      stroke="#98A2B3"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              />

              <InputField
                type="text"
                name={teamFields.private_key.id}
                id={teamFields.private_key.id}
                label={teamFields.private_key.label}
                defaultValue={team?.private_key}
                icon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.06004 6.00004C6.21678 5.55449 6.52614 5.17878 6.93334 4.93946C7.34055 4.70015 7.8193 4.61267 8.28483 4.69252C8.75035 4.77236 9.17259 5.01439 9.47676 5.37573C9.78093 5.73706 9.94741 6.19439 9.94671 6.66671C9.94671 8.00004 7.94671 8.66671 7.94671 8.66671M8.00004 11.3334H8.00671M14.6667 8.00004C14.6667 11.6819 11.6819 14.6667 8.00004 14.6667C4.31814 14.6667 1.33337 11.6819 1.33337 8.00004C1.33337 4.31814 4.31814 1.33337 8.00004 1.33337C11.6819 1.33337 14.6667 4.31814 14.6667 8.00004Z"
                      stroke="#98A2B3"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              />
            </div>
            <div className="flex flex-col space-y-6 sm:flex-1">
              <SelectFieldArea
                id={teamFields.approved_roles.id}
                label={teamFields.approved_roles.label}>
                <RoleMultiSelect
                  approvedRoles={team?.approved_roles || []}
                  id={teamFields.approved_roles.id}
                />
              </SelectFieldArea>

              <SelectField
                name={teamFields.helpdesk.id}
                id={teamFields.helpdesk.id}
                label={teamFields.helpdesk.label}>
                <option>Select a Help Desk</option>
                <option value={"helpscout"}>Help Scout</option>
                <option value={"zendesk"}>Zendesk</option>
              </SelectField>
            </div>
          </div>
          <SubmitAndCanelButtons
            onSubmit={handleSave}
            submitText={formTitle}
            onCancel={() => {
              setCurrentView("teams");
            }}
          />
        </div>
      </form>
    </>
  );
};
export default EditTeam;