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
const inpActivity = document.getElementById('activity');
const inpEmployee = document.getElementById('employee');

const pbSubmitUpdate = document.getElementById('submitUpdate');


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

}

spanClose.onclick = function () {
  modalBox.style.display = 'none';
}


async function createTableFromMap() {
  await createBookingMap();
  out("create table");
  bookingMap.forEach(booking => addRow(booking)
  )
}
