import Multiselect from "multiselect-react-dropdown";
import { useMemo } from "react";

/**
 * MultiSelect component for WordPress Roles
 */
const RoleMultiSelect = ({ approvedRoles = [], id, onChange }) => {
  const rolesOptions = useMemo(() => {
    let tl = window.tlVendor || {};
    let roles =
      tl && tl.roles
        ? tl.roles
        : {
            administrator: "Administrator",
            editor: "Editor",
          };
    return Object.keys(roles).map((role) => {
      return {
        id: role,
        name: roles[role],
      };
    });
  }, [window.tlVendor]);

  function handleChange(selectedList) {
    onChange ? onChange(selectedList.map((item) => item.id)) : null;
  }

  const currentValues = approvedRoles.map((value) => {
    return rolesOptions.find((item) => item.id === value);
  });

  return (
    <>
      <Multiselect
        id={id}
        options={rolesOptions} // Options to display in the dropdown
        selectedValues={currentValues || {}} // Preselected value to persist in dropdown
        onSelect={handleChange} // Function will trigger on select event
        onRemove={handleChange} // Function will trigger on remove event
        displayValue="name" // Property name to display in the dropdown options
      />
    </>
  );
};

export default RoleMultiSelect;
