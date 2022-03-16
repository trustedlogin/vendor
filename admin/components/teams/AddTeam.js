import { useSettings } from "../../hooks/useSettings";
import { useView } from "../../hooks/useView";
import EditTeam from "./EditTeam";

const AddTeam = () => {
  const { addTeam } = useSettings();
  const { setCurrentView } = useView();
  const onClickSave = (newTeam) => {
    addTeam(newTeam, true);
    setCurrentView("teams");
  };
  return <EditTeam onClickSave={onClickSave}
    formTitle={"Add Team"} />;
};

export default AddTeam;
