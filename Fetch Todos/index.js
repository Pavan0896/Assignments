let getData = async()=>{
    let a = await fetch("https://jsonplaceholder.typicode.com/todos");
    let b = await a.json();
    console.log(b);
    displayData(b);
}

getData();

function displayData(arr){
    let tBody = document.querySelector("tbody")
    tBody.innerHTML = "";

    arr.forEach(e => {

        let tRow = document.createElement("tr");

        let id = document.createElement("td");
        id.innerText = e.id;

        let title = document.createElement("td");
        title.innerText = e.title;

        let status = document.createElement("td");
        status.innerText = e.completed;

        tRow.append(id, title, status)
        tBody.append(tRow);
        
    });

}