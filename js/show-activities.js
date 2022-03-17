
out('vi er igang med fetch activities');

const activitiesUrl = baseurl + 'activities';

function fetchAllActivities() {
  out("get all activities kaldt");
  return fetch(activitiesUrl).then(response => response.json());
}


const activityMap = new Map();
async function createActivityMap() {
  out("show activities");
  const activityList = await fetchAllActivities();
  activityList.forEach((activity.title, index) =>

    activityMap.set(activity.title, activity);
  })
}



function showActivityMap() {

  for (const activityKey of activityMap.keys()) {
  }
}

//callGetAllKommuner();
const pbFetchActivities = document.getElementById('show-activities');
/*const pbShowCountyMap = document.getElementById('pbShowCountyMap');
const tblCounties = document.getElementById('countyTable');*/

//add event listeners
pbFetchActivities.addEventListener('click', showActivityMap);
/*pbShowCountyMap.addEventListener('click', showCountyMap);*/



