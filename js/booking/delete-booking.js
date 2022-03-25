let bookingDelete = baseurl + deleteurl + 'booking/';

/**
 * Able to delete a booking
 * @param booking
 * @returns {Promise<Response>} deleted booking
 */
async function deleteBooking(id) {
  bookingDelete = bookingDelete + id;
  out(bookingDelete);

  const fetchOptions = {
    method: "DELETE",
    headers: {
      "Content-type": "application/json"
    }
  }

//calls API (Backend) and wait for return
  const response = await fetch(bookingDelete, fetchOptions);

  if (!response) {
    alert('Something went wrong with delete json');
  } else {
    if (response.ok) {
      alert(id + ' is deleted');
    } else {
      alert('Something went wrong\nERROR status: ' + response.status);
    }
  }
  return response;

}
