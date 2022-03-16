out('er i insert form');

//generate api from config file
const url = baseurl + createurl + 'activity';

//execute function createFormEventListener when html is loaded
document.addEventListener('DOMContentLoaded', createFormEventListener);

let activityForm;
//add eventlistener to html form
function createFormEventListener() {
  activityForm = document.getElementById('newActivityForm');
  activityForm.addEventListener('submit', handleFormSubmit);
}

async function handleFormSubmit(event) {
  //preventDefault forhindrer form i at udføre default submit. altås sende sig selv til backend.
  event.preventDefault();
  const form = event.currentTarget;
  out(url);
  try {
    const formData = new FormData(form);
    const responseData = await postFormDataAsJson(url, formData);
    out(responseData);
    alert(formData.get('activityTitle') + ' er oprettet');

  } catch (err) {
    alert(err.message);
    out(err);
  }
}

async function postFormDataAsJson(url, formData) {
  const plainFormData = Object.fromEntries(formData.entries());
  out(plainFormData);
  const formDataJsonString = JSON.stringify(plainFormData);

  out(formDataJsonString);

  const fetchOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: formDataJsonString
  };

  const response = await fetch(url, fetchOptions);
  if (!response) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  return response.json();
}
