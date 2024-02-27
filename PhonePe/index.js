let pay = document.querySelector("button");
pay.addEventListener("click", () => {
  event.preventDefault();
  let amount = document.getElementById("amount");
  console.log(amount.value);
  initiatePayment().then(() => {
    processingMessage();
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let time = Math.random() < 0.75;
        if (time) {
          resolve(successMessage());
        } else {
          reject(failureMessage());
        }
      }, 2000);
    });
  });
});

function initiatePayment() {
  return new Promise((resolve) => {
    console.log("Payment initiated...");
    resolve();
  });
}

function processingMessage() {
  let page = document.getElementById("initial");
  page.innerHTML = "";
  let div = document.createElement("div");
  let div1 = document.createElement("div");
  div.setAttribute("id", "processingDiv");
  div1.setAttribute("class", "loader");
  div.append(div1);
  page.append(div);
}

function successMessage() {
  let page = document.getElementById("initial");
  page.innerHTML = "";
  page.removeAttribute("id", "initial");
  page.setAttribute("id", "success");
  let div = document.createElement("div");
  div.setAttribute("id", "successDiv");
  div.textContent = "Payment Success";
  let btn = document.createElement("button");
  btn.innerText = "DONE";
  btn.innerText = "DONE";
  btn.addEventListener("click", () => {
    page.setAttribute("id", "Initial");
    page.innerHTML = `<div id="initial">
    <form>
      <input
        type="number"
        placeholder="Enter Amount"
        id="amount"
        
      /><br />
      <select id="select" value="Select Bank" >
        <option value="">Select Bank</option>
        <option value="sbi">SBI</option>
        <option value="canara">Canara Bank</option>
        <option value="icici">ICICI</option>
        <option value="hdfc">HDFC</option></select
      ><br />
      <button>PROCEED TO PAY</button>
    </form>
  </div>`;
  });
  page.append(div, btn);
  console.log("Success");
}

function failureMessage() {
  let page = document.getElementById("initial");
  page.innerHTML = "";
  page.removeAttribute("id", "initial");
  page.setAttribute("id", "success");
  let div = document.createElement("div");
  div.setAttribute("id", "failDiv");
  div.textContent = "Payment Failed";
  let btn = document.createElement("button");
  btn.innerText = "RETRY";
  btn.addEventListener("click", () => {
    page.setAttribute("id", "Initial");
    page.innerHTML = `<div id="initial">
    <form>
      <input
        type="number"
        placeholder="Enter Amount"
        id="amount"
        
      /><br />
      <select id="select" value="Select Bank" >
        <option value="">Select Bank</option>
        <option value="sbi">SBI</option>
        <option value="canara">Canara Bank</option>
        <option value="icici">ICICI</option>
        <option value="hdfc">HDFC</option></select
      ><br />
      <button>PROCEED TO PAY</button>
    </form>
  </div>`;
  });
  page.append(div, btn);
  console.log("Failure");
}
