document.querySelector("button").addEventListener("click", function () {
  fetch("https://reqres.in/api/users")
    .then((response) => response.json())
    .then((data) => {
      let users = data.data;
      //   console.log(users);
      let usersList = document.getElementById("users");
      usersList.innerHTML = "";
      users.forEach((e) => {
        
        let listItem = document.createElement("li");
        listItem.classList.add("user");
        
        let img = document.createElement("img");
        img.src = e.avatar;

        let name = document.createElement("h3");
        name.innerHTML = `${e.first_name} ${e.last_name}`;

        let email = document.createElement("p");
        email.innerText = e.email;

        listItem.append(img, name, email);
        usersList.append(listItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
    });
});
