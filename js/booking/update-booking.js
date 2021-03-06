out('Update booking');

let url = baseurl + updateurl + 'booking/';

async function updateBooking(booking) {
  out(booking);
  url = url + booking.bookingId;
  out(url);

  const jsonString = JSON.stringify(booking);

  const fetchOptions = {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: jsonString
  }
  //calls API (Backend) and wait for return
  const response = await fetch(url, fetchOptions);

  out(response);

  out(response);
  if (!response) {
    alert('Something went wrong');
    out("Det gik ikke godt med update");
  } else {
    if (response.ok) {
      alert(booking.bookingId + ' is updated');
    } else {
      alert('Something went wrong\nERROR status: ' + response.status);
    }
  }

  return response;
}
