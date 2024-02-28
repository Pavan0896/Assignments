document.querySelector("button").addEventListener("click", () => {
  let movie = document.getElementById("movie-name").value;
  fetchMovie(movie);
});

async function fetchMovie(name) {
  try {
    let a = await fetch(`https://www.omdbapi.com/?apikey=b716df3b&t=${name}`);
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
  let body = document.getElementById("about");
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
