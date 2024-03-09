document.getElementById("movie-name").addEventListener("input", () => {
  debouncing(fetchMovie, 1500);
});

let timer;

function debouncing(func, delay) {
  if (timer) {
    clearTimeout(timer);
  }

  timer = setTimeout(() => {
    func();
  }, delay);
}

async function fetchMovie() {
  try {
    let movie = document.getElementById("movie-name").value;
    let a = await fetch(`https://www.omdbapi.com/?apikey=b716df3b&t=${movie}`);
    let b = await a.json();
    if (b.Response === "False") {
      return alert(
        "The movie name you are looking for does not exist. Please enter correct movie name."
      );
    }
    displayMovie(b);
  } catch (error) {
    console.log("Enter valid movie name", error);
  }
}

function displayMovie(name) {
  let body = document.getElementById("movies");
  body.innerHTML = "";

  let div = document.createElement("div");

  let poster = document.createElement("img");
  poster.src = name.Poster;

  let title = document.createElement("h2");
  title.innerText = name.Title;

  let director = document.createElement("h5");
  director.innerText = `Directed By : ${name.Director}`;

  let actors = document.createElement("h5");
  actors.innerText = `Cast : ${name.Actors}`;

  let genre = document.createElement("h5");
  genre.innerText = `Genre : ${name.Genre}`;

  let language = document.createElement("h5");
  language.innerText = `Language : ${name.Language}`;

  let release = document.createElement("h5");
  release.innerText = `Released On : ${name.Released}`;

  let imdb = document.createElement("h5");
  imdb.innerText = `iMDB Rating : ${name.imdbRating}`;

  div.append(poster, title, director, actors, genre, language, release, imdb);
  body.append(div);
}

document.getElementById("recipe-name").addEventListener("input", () => {
  throttledFetchRecipe();
});

async function fetchRecipe() {
  try {
    let recipe = document.getElementById("recipe-name").value;
    let a = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`
    );
    let b = await a.json();
    displayRecipe(b.meals);
  } catch (error) {
    console.log(error);
  }
}

function displayRecipe(arr) {
  let body = document.getElementById("recipes");
  body.innerHTML = "";

  arr.forEach((e) => {
    let div = document.createElement("div");

    let img = document.createElement("img");
    img.src = e.strMealThumb;

    let meal = document.createElement("h2");
    meal.innerText = `${e.strMeal}`;

    let category = document.createElement("h5");
    category.innerText = `Category : ${e.strCategory}`;

    let country = document.createElement("h5");
    country.innerText = `Country : ${e.strArea}`;

    div.append(img, meal, category, country);
    body.append(div);
  });
}

function throttling(func, delay = 1000) {
  let flag = false;

  return function () {
    if (flag) return;
    func();
    flag = true;

    setTimeout(() => {
      flag = false;
    }, delay);
  };
}

throttledFetchRecipe = throttling(fetchRecipe, 1000);
