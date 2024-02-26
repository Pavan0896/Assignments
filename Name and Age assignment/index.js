let data = JSON.parse(localStorage.getItem("data")) || [];

let form = document.querySelector("form");
form.addEventListener("submit", () => {
  event.preventDefault();
  let name = document.getElementById("name");
  let age = document.getElementById("age");

  let obj = {
    userName: name.value,
    userAge: age.value,
  };

  data.push(obj);
  name.value= "";
  age.value = "";
  localStorage.setItem("data", JSON.stringify(data));
  
});

document.querySelector("button").addEventListener("click", () => {
  let dataArr = JSON.parse(localStorage.getItem("data")) || [];
  console.log("data", dataArr);
  let details = document.getElementById("details");
  details.innerHTML = "";
  let table = document.createElement("table");
  let tHead = document.createElement("thead");
  let head = document.createElement("tr");
  let Name = document.createElement("th");
  Name.innerText = "Name";
  let Age = document.createElement("th");
  Age.innerText = "Age";
  let tBody = document.createElement("tbody");
  head.append(Name, Age);
  tHead.append(head);
  table.append(tHead,tBody);
  details.append(table);

  dataArr.forEach((element) => {
    let body = document.querySelector("tbody");
    let trow = document.createElement("tr");
    let tName = document.createElement("td");
    tName.innerText = element.userName;
    let tAge = document.createElement("td");
    tAge.innerText = element.userAge;
    trow.append(tName, tAge);
    body.append(trow);
  });
});
