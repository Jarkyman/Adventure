// out('Delete activity');

let activityDeleteUrl = baseurl + deleteurl + 'activity/';

/**
 * Able to delete an activity
 * @param activity
 * @returns {Promise<Response>} deleted activity
 */
async function deleteActivity(id) {
  activityDeleteUrl = activityDeleteUrl + id;
  out(activityDeleteUrl);

  const fetchOptions = {
    method: "DELETE",
    headers: {
      "Content-type": "application/json"
    }
  }

//calls API (Backend) and wait for return
  const response = await fetch(activityDeleteUrl, fetchOptions);

  if (!response) {
    alert('Something went wrong with delete json');
  } else {
    alert(id + ' deleted');
  }

  return response;

}
