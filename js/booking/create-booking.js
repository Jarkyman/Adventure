const createBookingUrl = baseurl + createurl + 'booking/';

//execute function createFormEventListener when html is loaded
document.addEventListener('DOMContentLoaded', createFormEventListener);
const inpDate = document.getElementById('bookingDate');
const selActivities = document.getElementById('activity');

let bookingForm;

//add eventlistener to html form
async function createFormEventListener() {
  minDate();
  await getActivities();
  await getEmployees();
  bookingForm = document.getElementById('newBookingForm');
  bookingForm.addEventListener('submit', handleFormSubmit);
}

async function getEmployees() {
  out("show all employees");
  let employees = [];
  const employeeList = await fetch(baseurl + 'employees/').then(response => response.json());
  employeeList.forEach((employee) => {
    if (employee.employeeTitle === 'Træner') {
      const temp = JSON.stringify(employee);
      employees.push(temp);
      //out('temp: ' + temp);

    }
  });

  //out('obj 1');
  //out(employees[0]);

  return employees;
}

async function getActivities() {
  out("show all activities");
  const activityList = await fetch(baseurl + 'activities/').then(response => response.json());
  //out(activityList);
  activityList.forEach((activity) => {
    let option = document.createElement('option');
    option.value = JSON.stringify(activity);
    //out(option.value);
    option.text = activity.activityTitle;
    selActivities.options.add(option);
  });
}

function minDate () {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }

  today = yyyy + '-' + mm + '-' + dd;
  inpDate.setAttribute("min", today);
  inpDate.setAttribute("value", today);
}

async function handleFormSubmit(event) {
  //preventDefault forhindrer form i at udføre default submit. altås sende sig selv til backend.
  event.preventDefault();
  const form = event.currentTarget;
  out(createBookingUrl);
  //const employees = await getEmployees();
  //out(employees);
  try {
    const formData = new FormData(form);
    const responseData = await postFormDataAsJson(createBookingUrl, formData);
    out('response data:');
    out(responseData);
    alert('Booking er gennemført');

  } catch (err) {
    alert(err.message);
    out(err);
  }
}

async function postFormDataAsJson(url, formData) {
  let formDataAct = formData.get('activity');
  formData.delete('activity');
  const plainFormData = Object.fromEntries(formData.entries());


  out('PlaneFormData');
  out(plainFormData);
  out(plainFormData.activity);

  const formDataJsonString = JSON.stringify(plainFormData);

  const employees = await getEmployees();
  out(employees[0]);
  let datanoget = formDataJsonString.replace('{', '');
  datanoget = datanoget.replace('}', ''); //#Lortekode
  let bodyDone = '{' + datanoget + ',"activity": ' + formDataAct + ',"employee": ' + employees[0] + '}';

  out('BodyDone: ');
  out(bodyDone);

  out('json string');
  out(formDataJsonString);

  const fetchOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: bodyDone
  };

  const response = await fetch(url, fetchOptions);
  if (!response) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  return response.json();
}
