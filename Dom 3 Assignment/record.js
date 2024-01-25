var arr = [];

var filterVal = document.getElementById("filter");
filterVal.addEventListener("change",function(){
    filterData(arr);
});

function filterData(arr){
    var valFilter = filterVal.value
    var filterArr = arr.filter(function(e){
        return e.department == valFilter;
    });
    console.log(filterArr);
    displayData(filterArr);
}


let form1 = document.querySelector("form");
form1.addEventListener("submit",function(){
    event.preventDefault();
    var name1 = document.getElementById("name").value;
    var employeeID1 = document.getElementById("employeeID").value;
    var department1 = document.getElementById("department").value;
    var experience1 = document.getElementById("exp").value;
    var email1 = document.getElementById("email").value;
    var mobile1 = document.getElementById("mbl").value;

    var obj = {
        name : name1,
        empID : employeeID1,
        department : department1,
        experience : experience1,
        email : email1,
        mobile : mobile1 
    }
    name1="";
    employeeID1="";
    department1="";
    experience1="";
    email1="";
    mobile1="";
    arr.push(obj)
    
    displayData(arr)
    
})

function displayData(arr){

    var tbody = document.querySelector("tbody")
    tbody.innerHTML = ""
    
    arr.forEach(function(e, i) {
        var tr1 = document.createElement("tr");
        
        var tName = document.createElement("td");
        tName.innerText = e.name;
        
        var tEmpID = document.createElement("td");
        tEmpID.innerText = e.empID;
        
        var tDept = document.createElement("td");
        tDept.innerText = e.department;
        
        var tExp = document.createElement("td");
        tExp.innerText = e.experience;
        
        var tEmail = document.createElement("td");
        tEmail.innerText = e.email;
       
        var tMob = document.createElement("td");
        tMob.innerText = e.mobile;

        var tRole = document.createElement("td");
        if(e.experience>5){
            tRole.innerText = "Senior";
        }
        else if(e.experience>2 && e.experience<=5){
            tRole.innerText = "Junior";
        }
        else{
            tRole.innerText = "Fresher";
        }

        var delBtn = document.createElement("button");
        delBtn.innerText="Delete";
        delBtn.addEventListener("click",function(){
            arr.splice(i,1);
            displayData(arr);
        })

        tr1.append(tName,tEmpID,tDept,tExp,tEmail,tMob,tRole,delBtn);
        tbody.append(tr1);
    });
}

