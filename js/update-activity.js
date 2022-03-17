
out('Update activity');

let url = baseurl + updateurl + 'activity';

async function updateCounty(activity) {
  url = url + activity.activityId;

  const jsonString = JSON.stringify(county);
  fetchOptions.body = jsonString;

  const fetchOptions = {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: jsonString
  }

  //calls backend and wait for return
  const response = await fetch(url, fetchOptions);

  out(response);
  if (!response.ok) {
    out("Det gik ikke godt med update");
  }

  return response;
}
