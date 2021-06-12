var values = {};
var errors = [];
var errMsg = {};
var map = { email: 1, name: 2, password: 3, mobile: 4 };
var fields = ["email", "name", "password", "mobile"];
var errorMap = {
  "email" : "Please enter a valid email",
  "name": "Name should be min 4 char and max 30 char",
  "password": "Password should be min 8 and max char 25",
  "mobile": "Mobile number should be 10 digits"
}

const regEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regName = /^.{4,30}$/;
const regPass = /^([a-zA-Z0-9@*#]{8,25})$/;
const regMob = /^(\+\d{1,3}[- ]?)?\d{10}$/;

function validateFields(ele) {
  switch (ele.name) {
    case "email":
      const em = regEmail.test(ele.value);
      return em;
    case "name":
      const nm = regName.test(ele.value);
      return nm;
      break;
    case "password":
      const ps = regPass.test(ele.value);
      return ps;
    case "mobile":
      const mb = regMob.test(ele.value);
      return mb;
    default:
      return true;
  }
}

function setError(ele) {
  ele.style.border = "1px solid red";
  errors.push(ele);
  errMsg[ele.name] = errorMap[ele.name]
}

function resetError(ele) {
  ele.style.border = "1px solid rgb(94, 93, 93)";
  errors = [...errors.filter(item => item !== ele)];
  delete errMsg[ele.name];
}

function removesChildNodes(parent) {
  const el = document.getElementById('err-wrap');
  if(el) el.remove();
}

function checkAllFields(currEle) {
  const erBox = document.getElementById('err-container');
  const errWrap = document.createElement('div');
  errWrap.id = 'err-wrap';
  errors = [], errMsg={};
  removesChildNodes(erBox);
  let param2 = currEle ? map[currEle.id] : fields.length;

  fields.slice(0, param2).forEach((item) => {
    const ele = document.getElementById(item);
    const p = document.createElement('p');

    if (!validateFields(ele)) {
      setError(ele);
    } else {
      resetError(ele);
    }
    if(errMsg[item]) {
      const text = document.createTextNode(errMsg[item]);
      p.appendChild(text);
      errWrap.appendChild(p);
      erBox.appendChild(errWrap);
      erBox.style.visibility = 'visible';
    } else if(!Object.keys(errMsg).length) {
      erBox.style.visibility = 'hidden';
    }
  });
}

function getValue(event) {
  const ele = event.target;
  if (ele.name === "password") {
    values[ele.name] = ele.value.replace(ele.value, "xxxxxxxx");
  } else {
    values[ele.name] = ele.value;
  }
  checkAllFields(ele);
}

function firstUpperCase(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1, str.length);
}

function submitData() {
  checkAllFields();
  if (errors.length) {
    return errors[0].focus();
  }
  document.querySelector("div").style.display = "none";
  const div = document.getElementById("details");
  const ul = document.createElement("ul");

  fields.forEach((item) => {
    const li = document.createElement("li");
    const textNode = document.createTextNode(
      `${firstUpperCase(item)} : ${values[item]}`
    );
    li.appendChild(textNode);
    ul.appendChild(li);
  });
  div.appendChild(ul);
  div.classList.add("details");
}