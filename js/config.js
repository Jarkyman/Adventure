//Print console.log
const out = function (str) {
  console.log(str);
}

//API calls
const baseurl = 'http://localhost:8080/'; //TODO: skal ændres til vores sky
const createurl = 'create/';
const updateurl = 'update/';
const deleteurl = 'delete/';



//Colors
const lightBlue = '#42b2df'; //rgb(66,178,223)
const yellow = '#edc73d'; //rgb(237,199,61)
const darkblue = '#1f8bca'; //rgb(31,139,202)
const brown = ''; //rgb(140,99,56)
const black = '#16100c'; //rgb(22,16,12)
const gray = '#fefefe'; //rgb(230,233,235)
const orange = '#e4480b'; //rgb(228,72,11)
const blueGray = '#505a56'; //rgb(80,90,86)
const navy = '#1f415d'; //rgb(31,65,93)

const body = document.getElementById('body');
body.style.backgroundColor = black;

/*const bodyLoggedIn = document.getElementById('body-logged-in');
bodyLoggedIn.style.backgroundColor = black;*/

const header = document.getElementById('header');
header.style.backgroundColor = darkblue;

const footer = document.getElementById('footer');
footer.style.backgroundColor = darkblue;

const login = document.getElementById('login');
login.style.backgroundColor = darkblue;
