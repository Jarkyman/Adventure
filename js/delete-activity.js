// out('Delete activity');

let activityDelete = baseurl + deleteurl + 'activity/';

/**
 * Able to delete an activity
 * @param activity
 * @returns {Promise<Response>} deleted activity
 */
async function deleteActivity(id) {
  console.log(activityDelete);
  activityDelete = activityDelete + id;
  console.log(activityDelete);

  const fetchOptions = {
    method: "DELETE",
    headers: {
      "Content-type": "application/json"
    }
  }

//calls API (Backend) and wait for return
  const response = await fetch(activityDelete, fetchOptions);

  if (!response) {
    alert('Something went wrong with delete json');
  } else {
    alert(activity.activityTitle + 'is deleted');
  }
  return response;

}
