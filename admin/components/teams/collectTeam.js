import teamFields from "./teamFields";

export default function collectTeam(formElement) {
  let team = {};
  const data = new FormData(formElement);
  for (let [key, value] of data) {
    team[key] = value;
  }
  let key = teamFields.approved_roles.id;
  if (team.hasOwnProperty(key)) {
    team[key] = [team[key]];
  } else {
    team[key] = [];
  }
  return team;
}
