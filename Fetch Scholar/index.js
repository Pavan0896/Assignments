let getData = async () => {
  let a = await fetch("https://fakestoreapi.com/products");
  let b = await a.json();

  displayItems(b);
  return b;
};

getData();

function displayItems(arr) {
  let root = document.getElementById("root");
  root.innerHTML = "";

  arr.forEach((e) => {
    let card = document.createElement("div");
    card.className = "card";

    let imgDiv = document.createElement("div");
    imgDiv.id = "imgDiv";
    let img = document.createElement("img");
    img.src = e.image;

    let details = document.createElement("div");
    details.id = "detailsDiv";

    let title = document.createElement("h3");
    title.innerText = e.title;

    let desc = document.createElement("details");

    let detailsSummary = document.createElement("summary");
    detailsSummary.innerText = "Description";

    let p = document.createElement("p");
    p.innerText = e.description;

    let priceDiv = document.createElement("div");
    priceDiv.id = "priceDiv";
    let price = document.createElement("h5");
    price.innerText = `$ ${e.price}`;

    let rating = document.createElement("h5");
    rating.innerHTML = `<h5><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
  </svg> ${e.rating.rate}</h5> `;

    imgDiv.append(img);
    desc.append(detailsSummary, p);
    priceDiv.append(price, rating);
    details.append(title, desc, priceDiv);
    card.append(imgDiv, details);
    root.append(card);
  });
}

let filter = document.getElementById("filter");
filter.addEventListener("change", async () => {
  console.log(filter.value);
  let a = await getData();
  if (filter.value == "") {
    return a;
  }
  filterData(a);
});

function filterData(arr) {
  let filterArr = arr.filter((e) => {
    return e.category == filter.value;
  });
  console.log(filterArr);
  displayItems(filterArr);
}

let sort = document.getElementById("sort");
sort.addEventListener("change", async () => {
  console.log(sort.value);
  let a = await getData();
  if (sort.value == "") {
    return a;
  } else if (sort.value == "lower") {
    let lowerArr = a.sort((a, b) => {
      return a.price - b.price;
    });
    displayItems(lowerArr);
  } else if (sort.value == "higher") {
    let higherArr = a.sort((a, b) => {
      return b.price - a.price;
    });
    displayItems(higherArr);
  }
});
