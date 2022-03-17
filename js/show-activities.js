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
    //out(activity.title + "ix=" + index);
    activityMap.set(activity.activityId, activity);
  })
}

function addRow(activity) {

  const rowActivity = activityTable.rows.length;
  let row = activityTable.insertRow(rowActivity);
  let colActivity = 0;

  let cell = row.insertCell(colActivity++);
  cell.innerText = activity.activityId;

  cell = row.insertCell(colActivity++);
  cell.innerText = activity.activityTitle;

  cell = row.insertCell(colActivity++);
  cell.innerText = activity.activityPriceOneHour;

}

async function createTableFromMap() {
  await createActivityMap();
  out("create table");
  activityMap.forEach(activity => addRow(activity)
  )
}
