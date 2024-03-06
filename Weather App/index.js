let getData = async () => {
  let btn = document.querySelector("button");
  let city = document.getElementById("city");
  let arr = [];
  btn.addEventListener("click", async () => {
    try {
      let a = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=63e0963d580f8a2973a3d9d62b9bf905&units=metric`
      );
      let b = await a.json();
        console.log(b)
      arr.push(b);
      displayData(arr);
      getmaps(city.value);
    } catch (error) {
      console.log(error);
    }
  });
};

let displayData = (arr) => {
  let infoDiv = document.getElementById("info");
  

  arr.forEach((e) => {
    infoDiv.innerHTML = "";
    infoDiv.style.backgroundColor = "white";
    let div = document.createElement("div");
    div.setAttribute("id", "dataDiv")
    let city = document.createElement("h2");
    city.innerText = e.name;

    let temp = document.createElement("h3");
    temp.innerHTML = `<img src="https://cdn-icons-png.flaticon.com/512/3845/3845731.png"></img>${Math.ceil(e.main.temp)}\u00B0C`;

    let minTemp = document.createElement("h5");
    minTemp.innerText = `Minimum Temperature: ${Math.floor(e.main.temp_min)}\u00B0C`;

    let maxTemp = document.createElement("h5");
    maxTemp.innerText = `Maximum Temperature: ${Math.ceil(e.main.temp_max)} \u00B0C`;

    let humidity = document.createElement("p");
    humidity.innerHTML = `<span class="bold">Humidity :</span> ${e.main.humidity}`;

    let wind = document.createElement("p");
    wind.innerHTML = `<span class="bold">Wind</span> deg: ${e.wind.deg} speed: ${e.wind.speed}`;
;

    let desc = document.createElement("h4");
    desc.innerText = `Weather: ${e.weather[0].description}`;

    div.append(city, temp, minTemp, maxTemp, humidity, wind, desc);
    infoDiv.append(div);
  });
};

let getmaps = async (city) => {
  try {
    let map = document.querySelector("#gmap_canvas");
    document.querySelector("#gmap_canvas").style.display = "block";
    map.src = `https://maps.google.com/maps?q=${city}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  } catch (error) {
    console.error(error);
  }
};

window.onload = function () {
  getData();

};


