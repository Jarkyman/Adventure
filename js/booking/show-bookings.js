out('vi er igang med create table');

const bookingsUrl = baseurl + 'bookings';
const bookingsMap = new Map();

const bookingsTable = document.getElementById("bookingsTable");
const modalBox = document.getElementById("myModal");
const spanClose = document.getElementsByClassName("close")[0];
const inpbookingFullName = document.getElementById('bookingFullName');
const inpbookingPhoneNumber = document.getElementById('bookingPhoneNumber');
const inpbookingEmail = document.getElementById('bookingEmail');
const inpbookingDate = document.getElementById('bookingDate');
const inpbookingParticipants = document.getElementById('bookingParticipants');
const inpbookingActivity = document.getElementById('bookingActivity');
const inpbookingEmployee = document.getElementById('bookingEmployee');
const inpbookingTime = document.getElementById('bookingTime');
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
    bookingsMap.set(booking.bookingId, booking);
  })
}

function addRow(booking) {

  const rowBooking = bookingsTable.rows.length;
  let row = bookingsTable.insertRow(rowBooking);
  let colBooking = 0;

  let cell = row.insertCell(colBooking++);
  cell.innerText = booking.bookingFullName;

  cell = row.insertCell(colBooking++);
  cell.innerText = booking.bookingPhoneNumber;

  cell = row.insertCell(colBooking++);
  cell.innerText = booking.bookingEmail;

  cell = row.insertCell(colBooking++);
  cell.innerText = booking.bookingDate;

  cell = row.insertCell(colBooking++);
  cell.innerText = booking.bookingTime;

  cell = row.insertCell(colBooking++);
  cell.innerText = booking.bookingParticipants;

  cell = row.insertCell(colBooking++);
  cell.innerText = booking.bookingActivity;

  cell = row.insertCell(colBooking++);
  cell.innerText = booking.bookingEmployee;




}

spanClose.onclick = function () {
  modalBox.style.display = 'none';
}


async function createTableFromMap() {
  await createBookingMap();
  out("create table");
  bookingsMap.forEach(booking => addRow(booking)
  )
}
