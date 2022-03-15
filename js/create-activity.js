const out = function (str) {
  console.log(str);
}

out("er i insert form");

const url = 'http://localhost:8080/create/activity';


//execute function createFormEventListener when html is loaded
document.addEventListener('DOMContentLoaded', createFormEventListener);

let activityForm;
//add eventlistener to html form
function createFormEventListener() {
  activityForm = document.getElementById("newActivityForm");
  activityForm.addEventListener('submit', handleFormSubmit);
}

/*const submitActivity = document.getElementById('submitActivity');*/

async function handleFormSubmit(event) {
  //preventDefault forhindrer form i at udføre default submit. altås sende sig selv til backend.
  event.preventDefault();
  const form = event.currentTarget;
  out(url);
  try {
    const formData = new FormData(form);
    const responseData = await postFormDataAsJson(url, formData);
    out(responseData);
    alert(formData.get('name') + ' er oprettet');

  } catch (err) {
    alert(err.message);
    out(err);
  }
}


/*
async function handleFormSubmit(event) {
  //preventDefault forhindrer form i at udføre default submit. altås sende sig selv til backend.
  event.preventDefault();
  out(url);
  try {
    const formData = new FormData(form);
    const responseData = await postFormDataAsJson(url, formData);
    out(responseData);
    alert(formData.get('name') + ' er oprettet');

  } catch (err) {
    alert(err.message);
    out(err);
  }
}
*/

async function postFormDataAsJson(url, formData) {
  out(formData.entries());
  const plainFormData = Object.fromEntries(formData.entries());
  out(plainFormData);

  plainFormData.jens={};
  plainFormData.jens.traet ='JA';
  const formDataJsonString = JSON.stringify(plainFormData);

  out(formDataJsonString);

  const fetchOptions = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: formDataJsonString
  };

  const response = await fetch(url, fetchOptions);
  if (!response) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  return response.json();
}
