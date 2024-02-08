var btn = document.querySelector("#roll button");
btn.addEventListener("click", function () {
  var member1 = document.getElementById("member-1");
  var num1 = Math.floor(Math.random() * 6) + 1;
  member1.innerText = num1;

  var member2 = document.getElementById("member-2");
  var num2 = Math.floor(Math.random() * 6) + 1;
  member2.innerText = num2;

  var member3 = document.getElementById("member-3");
  var num3 = Math.floor(Math.random() * 6) + 1;
  member3.innerText = num3;

  member1.style.backgroundColor = "rgb(218, 218, 218)";
  member2.style.backgroundColor = "rgb(218, 218, 218)";
  member3.style.backgroundColor = "rgb(218, 218, 218)";

  if (num1 > num2 && num1 > num3) {
    document.querySelector("h1").innerText = "Winner is Member A";
    member1.style.backgroundColor = "green";
  } else if (num2 > num1 && num2 > num3) {
    document.querySelector("h1").innerText = "Winner is Member B";
    member2.style.backgroundColor = "green";
  } else if (num3 > num2 && num3 > num1) {
    document.querySelector("h1").innerText = "Winner is Member C";
    member3.style.backgroundColor = "green";
  } else if (
    (num1 = num2) ||
    (num1 = num3) ||
    (num2 = num3) ||
    (num2 = num1) ||
    (num3 = num1) ||
    (num3 = num2)
  ) {
    document.querySelector("h1").innerText = "Roll Again";
  }

  if (num1 > num2 && num1 < num3) {
    member1.style.backgroundColor = "yellow";
  } else if (num1 < num2 && num1 > num3) {
    member1.style.backgroundColor = "yellow";
  } else if (num2 > num1 && num2 < num3) {
    member2.style.backgroundColor = "yellow";
  } else if (num2 < num1 && num2 > num3) {
    member2.style.backgroundColor = "yellow";
  } else if (num3 > num2 && num3 < num1) {
    member3.style.backgroundColor = "yellow";
  } else if (num3 < num2 && num3 > num1) {
    member3.style.backgroundColor = "yellow";
  }

  if (num1 < num2 && num1 < num3) {
    member1.style.backgroundColor = "red";
  } else if (num2 < num1 && num2 < num3) {
    member2.style.backgroundColor = "red";
  } else if (num3 < num2 && num3 < num1) {
    member3.style.backgroundColor = "red";
  }

  if ((num1 == num2) ||(num2 == num1)) {
    member1.style.backgroundColor = "blue";
    member2.style.backgroundColor = "blue";
  } 
  if ((num2 == num3)||(num3==num2)) {
    member2.style.backgroundColor = "blue";
    member3.style.backgroundColor = "blue";
  } 
  if ((num1 == num3)||(num3==num1)) {
    member1.style.backgroundColor = "blue";
    member3.style.backgroundColor = "blue";
  }
});
