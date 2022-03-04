export default function collectTeam(formElement) {
  let team = {};
  const data = new FormData(formElement);
  for (let [key, value] of data) {
    team[key] = value;
  }
  return team;
}
