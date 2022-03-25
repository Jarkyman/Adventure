out('Update booking');

let url = baseurl + updateurl + 'booking/';

async function updateBooking(booking) {
  out(booking);
  url = url + booking.bookingId;
  out(url);

  alert();

  const jsonString = JSON.stringify(booking);

  const fetchOptions = {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: jsonString
  }

  alert(jsonString);
  //calls API (Backend) and wait for return
  const response = await fetch(url, fetchOptions);

  alert(response);
  out(response);
  if (!response) {
    alert('Something went wrong');
    out("Det gik ikke godt med update");
  } else {
    alert(booking.bookingId + ' is updated');
  }

  alert();
  return response;
}
