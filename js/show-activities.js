
out('vi er igang med create table');

const activitiesUrl = baseurl + 'activities';

function fetchAllActivities() {
  out("get all activities kaldt");
  return fetch(activitiesUrl).then(response => response.json());
}

const activityMap = new Map();
async function createActivityMap() {
  out("show all activities");
  const activityList = await fetchAllActivities();
  out(activityList);
  activityList.forEach((activity, index) => {
    //out(activity.title + "ix=" + index);
    activityMap.set(activity.activityId, activity);
  })
}

createActivityMap();

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

function createTableFromMap() {
  out("create table");
  activityMap.forEach(activity => addRow(activity)
  )
}

  const activityTable = document.getElementById("activityTable");
  const pbCreateTable = document.getElementById("pbCreateTable");

  pbCreateTable.addEventListener('click', createTableFromMap);
