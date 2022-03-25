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

  cell = row.insertCell(colActivity++);
  const pbUpdate = document.createElement('button');
  pbUpdate.innerText = 'Update';
  pbUpdate.onclick = function () {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    modalBox.style.display = 'block';
    inpActivityTitle.value = activity.activityTitle;
    inpActivityPrice.value = activity.activityPriceOneHour;
    pbSubmitUpdate.onclick = async function () {
      activity.activityTitle = inpActivityTitle.value;
      activity.activityPriceOneHour = inpActivityPrice.value;
      await updateRow(activity);
      modalBox.style.display = 'none';
    }
  }
  spanClose.onclick = function () {
    modalBox.style.display = 'none';
  }
  cell.appendChild(pbUpdate);


  cell = row.insertCell(colActivity++);
  const pbDelete = document.createElement('button');
  pbDelete.innerText = 'Delete';
  pbDelete.onclick = async function () {
    await deleteActivity(activity.activityId);
    location.reload();
  }
  cell.appendChild(pbDelete);

}

async function updateRow(activity) {
  activity.activityTitle = inpActivityTitle.value;
  activity.activityPriceOneHour = inpActivityPrice.value;
  const response = await updateActivity(activity);
  out(response);
  //crazy rule, Reload page
  location.reload();
}

async function createTableFromMap() {
  await createActivityMap();
  out("create table");
  activityMap.forEach(activity => addRow(activity)
  )
}
