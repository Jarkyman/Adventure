out('vi er igang med create table');

const activitiesUrl = baseurl + 'activities';
const activityMap = new Map();

const activityTable = document.getElementById("activityTable");
const modalBox = document.getElementById("myModal");
const spanClose = document.getElementsByClassName("close")[0];
const inpActivityTitle = document.getElementById('activityTitle');
const inpActivityPrice = document.getElementById('activityPricePerHour');
const pbSubmitUpdate = document.getElementById('submitUpdate');

document.addEventListener('DOMContentLoaded', createTableFromMap);

function fetchAllActivities() {
  out("get all activities kaldt");
  return fetch(activitiesUrl).then(response => response.json());
}

window.onclick = function (event) {
  if (event.target == modalBox) {
    modalBox.style.display = "none";
  }
}

async function createActivityMap() {
  out("show all activities");
  const activityList = await fetchAllActivities();
  out(activityList);
  activityList.forEach((activity) => {
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


}

spanClose.onclick = function () {
  modalBox.style.display = 'none';
}


async function createTableFromMap() {
  await createActivityMap();
  out("create table");
  activityMap.forEach(activity => addRow(activity)
  )
}
