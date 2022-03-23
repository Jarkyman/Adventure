const modalBox = document.getElementById("myModal");
const pbSubmitUpdate = document.getElementById('submitUpdate');

function openModal(response) {
  modalBox.style.display = 'block'
  fillReceipt(response);
}

function fillReceipt(response) {
  //TODO: add more text
  document.getElementById('fullNameModal').innerText = 'Thanks for your booking ' + response.fullName + '. We are happy that you choose us';
}
