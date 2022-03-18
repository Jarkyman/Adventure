out('vi er igang med create table');

const activitiesUrl = baseurl + 'activities';
const activityMap = new Map();

const activityTable = document.getElementById("activityTable");

document.addEventListener('DOMContentLoaded', createTableFromMap);

function fetchAllActivities() {
  out("get all activities kaldt");
  return fetch(activitiesUrl).then(response => response.json());
}

async function createActivityMap() {
  out("show all activities");
  const activityList = await fetchAllActivities();
  out(activityList);
  activityList.forEach((activity, index) => {
    activityMap.set(activity.activityId, activity);
  })
}

function addRow(activity) {

  const rowActivity = activityTable.rows.length;
  let row = activityTable.insertRow(rowActivity);
  let colActivity = 0;

  let cell = row.insertCell(colActivity++);
  cell.innerText = activity.activityTitle;

  cell = row.insertCell(colActivity++);
  cell.innerText = activity.activityPriceOneHour;

  cell = row.insertCell(colActivity++);
  const pbUpdate = document.createElement("input");
  pbUpdate.type = "button";
  pbUpdate.setAttribute('value', 'Update activity');
  pbUpdate.onclick = function () {
    //TODO: Add update function here
  }
  cell.appendChild(pbUpdate);

}

async function createTableFromMap() {
  await createActivityMap();
  out("create table");
  activityMap.forEach(activity => addRow(activity)
  )
}
