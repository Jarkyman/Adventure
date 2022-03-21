out('Update activity');

let url = baseurl + updateurl + 'activity/';

async function updateActivity(activity) {
  out(activity);
  url = url + activity.activityId;
  out(url);

  const jsonString = JSON.stringify(activity);

  const fetchOptions = {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: jsonString
  }

  //calls API (Backend) and wait for return
  const response = await fetch(url, fetchOptions);

  out(response);
  if (!response) {
    alert('Something went wrong');
    out("Det gik ikke godt med update");
  } else {
    alert(activity.activityTitle + ' is updated');
  }

  return response;
}
