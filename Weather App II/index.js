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
      //   console.log(b);

      let c = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city.value}&appid=63e0963d580f8a2973a3d9d62b9bf905&units=metric`
      );
      let d = await c.json();
      console.log(d);
      let days = document.querySelectorAll(".icons");
      for (let i = 0; i < days.length; i++) {
        days[i].style.display = "block";
      }

      arr.push(b);
      displayWeather(arr);
      getmaps(city.value);
      displayForecast(d);
    } catch (error) {
      console.log(error);
    }
  });
};

const displayWeather = (arr) => {
  let infoDiv = document.getElementById("info");

  arr.forEach((e) => {
    infoDiv.innerHTML = "";
    infoDiv.style.backgroundColor = "white";

    let city = document.createElement("h2");
    city.innerText = e.name;

    let temp = document.createElement("h3");
    temp.innerHTML = `<img src="https://cdn-icons-png.flaticon.com/512/3845/3845731.png"></img>${Math.ceil(
      e.main.temp
    )}\u00B0C`;

    let minTemp = document.createElement("h5");
    minTemp.innerText = `Min ${Math.floor(e.main.temp_min)}\u00B0C`;

    let maxTemp = document.createElement("h5");
    maxTemp.innerText = `Max ${Math.ceil(e.main.temp_max)} \u00B0C`;

    let humidity = document.createElement("p");
    humidity.innerHTML = `<span class="bold">Humidity :</span> ${e.main.humidity}`;

    let wind = document.createElement("p");
    wind.innerHTML = `<span class="bold">Wind</span> deg: ${e.wind.deg} speed: ${e.wind.speed}`;
    let desc = document.createElement("h4");
    desc.innerText = `Weather: ${e.weather[0].description}`;

    infoDiv.append(city, temp, minTemp, maxTemp, humidity, wind, desc);
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

const displayForecast = (data) => {
  for (let i = 0; i < 5; i++) {
    document.getElementById("day" + (i + 1) + "Min").innerHTML =
      "Min:" + Math.floor(data.list[i].main.temp_min) + "\u00B0C";
    document.getElementById("day" + (i + 1) + "Max").innerHTML =
      "Max:" + Math.ceil(data.list[i].main.temp_max) + "\u00B0C";
  }
};

let d = new Date();
let weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function CheckDay(day) {
  if (day + d.getDay() > 6) {
    return day + d.getDay() - 7;
  } else {
    return day + d.getDay();
  }
}

for (let i = 0; i < 5; i++) {
  document.getElementById("day" + (i + 1)).innerHTML = weekday[CheckDay(i)];
}

window.onload = function () {
  getData();
};
