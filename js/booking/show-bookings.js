out('vi er igang med create table');

const bookingsUrl = baseurl + 'bookings';
const bookingMap = new Map();

const bookingTable = document.getElementById("bookingTable");
const modalBox = document.getElementById("myModal");
const spanClose = document.getElementsByClassName("close")[0];

const inpFullName = document.getElementById('fullName');
const inpPhoneNumber = document.getElementById('phoneNumber');
const inpEmail = document.getElementById('email');
const inpDate = document.getElementById('bookingDate');
const inpTime = document.getElementById('bookingTime');
const inpParticipants = document.getElementById('participants');
const selActivities = document.getElementById('activity');
const selEmployees = document.getElementById('employee');

const pbSubmitUpdate = document.getElementById('submitUpdateDone');


document.addEventListener('DOMContentLoaded', createTableFromMap);

function fetchAllBookings() {
  out("get all bookings kaldt");
  return fetch(bookingsUrl).then(response => response.json());
}

window.onclick = function (event) {
  if (event.target == modalBox) {
    modalBox.style.display = "none";
  }
}

async function getActivities() {
  out("show all activities");
  const activityList = await fetch(baseurl + 'activities/').then(response => response.json());
  activityList.forEach((activity) => {
    let option = document.createElement('option');
    option.value = JSON.stringify(activity);
    option.text = activity.activityTitle;
    selActivities.options.add(option);
  });
}

async function getEmployees() {
  out("show all employees");
  const employeeList = await fetch(baseurl + 'employees/').then(response => response.json());
  employeeList.forEach((employee) => {
    let option = document.createElement('option');
    option.value = JSON.stringify(employee);
    option.text = employee.employeeFirstName;
    selEmployees.options.add(option);
  });
}

async function createBookingMap() {
  out("show all bookings");
  const bookingList = await fetchAllBookings();
  out(bookingList);
  bookingList.forEach((booking) => {
    bookingMap.set(booking.bookingId, booking);
  })
}

function addRow(booking) {

  const rowBooking = bookingTable.rows.length;
  let row = bookingTable.insertRow(rowBooking);
  let colBooking = 0;

  let cell = row.insertCell(colBooking++);
  cell.innerText = booking.fullName;

  cell = row.insertCell(colBooking++);
  cell.innerText = booking.phoneNumber;

  cell = row.insertCell(colBooking++);
  cell.innerText = booking.email;

  cell = row.insertCell(colBooking++);
  cell.innerText = booking.bookingDate;

  cell = row.insertCell(colBooking++);
  cell.innerText = booking.bookingTime;

  cell = row.insertCell(colBooking++);
  cell.innerText = booking.participants;

  cell = row.insertCell(colBooking++);
  cell.innerText = booking.activity.activityTitle;

  cell = row.insertCell(colBooking++);
  cell.innerText = booking.employee.employeeFirstName;


  cell = row.insertCell(colBooking++);
  const pbUpdate = document.createElement('button');
  pbUpdate.innerText = 'Update';
  pbUpdate.onclick = async function () {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    modalBox.style.display = 'block';
    inpFullName.value = booking.fullName;
    inpPhoneNumber.value = booking.phoneNumber;
    inpEmail.value = booking.email;
    inpDate.value = booking.bookingDate;
    inpTime.value = booking.bookingTime;
    inpParticipants.value = booking.participants;
    await getActivities();
    await getEmployees();
    selActivities.value = JSON.stringify(booking.activity);
    selEmployees.value = JSON.stringify(booking.employee);

    pbSubmitUpdate.onclick = async function () {

      booking.fullName = inpFullName.value;
      booking.phoneNumber = inpPhoneNumber.value;
      booking.email = inpEmail.value;
      booking.bookingDate = inpDate.value;
      booking.bookingTime = inpTime.value;
      booking.participants = inpParticipants.value;

      booking.activity = JSON.parse(selActivities.value);
      booking.employee = JSON.parse(selEmployees.value);

      out('Value');
      out(inpFullName.value);
      out(booking);
      await updateBooking(booking);
      modalBox.style.display = 'none';
    }
  }
  spanClose.onclick = function () {
    modalBox.style.display = 'none';
  }
  cell.appendChild(pbUpdate);


  cell = row.insertCell(colBooking++);
  const pbDelete = document.createElement('button');
  pbDelete.innerText = 'Delete';
  pbDelete.onclick = function () {
    deleteBooking(booking.bookingId);
    location.reload();
  }
  cell.appendChild(pbDelete);

}


async function createTableFromMap() {
  await createBookingMap();
  out("create table");
  bookingMap.forEach(booking => addRow(booking)
  )
}
