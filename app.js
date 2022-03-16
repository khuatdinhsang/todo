var btnAdd = document.querySelector('.add');
var btnSearch = document.querySelector('.search');
var searchInput = document.querySelector('#searchItem');
var btnDelete = document.querySelector('.delete');
var table = document.querySelector('#render');
var id = document.getElementById('id');
var name1 = document.getElementById('name');
var age = document.getElementById('age');
var list = [{
    Id: 1,
    Name: "sang",
    Age: 24,
}, {
    Id: 2,
    Name: "dong",
    Age: 40,
}, {
    Id: 3,
    Name: "nhung",
    Age: 13,
}];
show();


searchInput.onkeyup = function search() {
    var itemSearch = ` <thead>
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Age</th>
        <th>Action1</th>
        <th>Action2</th>
    </tr>
     </thead>`;
    for (var i = 0; i < list.length; i++) {
        if (list[i].Name.includes(searchInput.value)) {

            itemSearch +=
                `
            <tbody >
        <tr >
                    <td>${list[i].Id}</td>
                    <td>${list[i].Name}</td>
                    <td>${list[i].Age}</td>
                    <td> <button class="delete" onclick="remove(${list[i].Id})" >DELETE</button>
                    <td> <button class="edit" onclick="edit(${list[i].Id})" >EDIT</button>
            </tr>
             </tbody>
            `
        }
    }
    table.innerHTML = itemSearch;
}
btnAdd.onclick = function add() {
    var item = {
        Id: id.value,
        Name: name1.value,
        Age: age.value,
    }
    var t = validate();
    for (let i = 0; i < list.length; i++) {
        var ID = list[i].Id + 1;

    }
    item.Id = ID;
    let index = list.findIndex((c) => c.Id === item.Id);
    if (index >= 0) {
        list.splice(index, 1, item);
    } else if (t) {
        list.push(item);
        show();
        clear();
    }

}

function validate() {
    var nameParrent = document.querySelector('.name');
    var ageParrent = document.querySelector('.age');
    var inputName = name1.value;
    var inputAge = age.value;
    var ErrName = true;
    var ErrAge = true;
    var nameErr = document.querySelector('.name');
    var ageErr = document.querySelector('.age');
    nameErr.style.color = "red";
    ageErr.style.color = "red";
    const regexName = /^[a-zA-Z ]+$/;
    const regexAge = /^[0-9]+$/;
    if (inputName == "") {
        nameErr.innerHTML = "Khong duoc de trong";
    } else if (regexName.test(inputName) == false) {
        nameErr.innerHTML = "Ten khong hop le ";
    } else {
        nameErr.innerHTML = '';
        ErrName = false;
    }
    if (inputAge == "") {
        ageErr.innerHTML = "Khong duoc de trong";
    } else if (regexAge.test(inputAge) == false) {
        ageErr.innerHTML = "Tuoi khong hop le ";
    } else {
        ageErr.innerHTML = '';
        ErrAge = false;
    }
    if (ErrAge == false && ErrName == false) {

        return true;
    }

    return false;
}

function remove(id) {
    // var removeNode = document.querySelector('#row-' + id);
    // removeNode.parentNode.removeChild(removeNode);
    for (let i = 0; i < list.length; i++) {
        if (list[i].Id == id) {
            list.splice(i, 1);
            show();
        }
    }
}


function edit(x) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].Id == x) {
            id.value = list[i].Id;
            name1.value = list[i].Name;
            age.value = list[i].Age;
            remove(x);
            show();
        }
    }
}

function clear() {
    id.value = '';
    name1.value = '';
    age.value = '';
}

function show() {

    var tableshow = `
     <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Action1</th>
                <th>Action2</th>
            </tr>
             </thead>
    `
    for (var i = 0; i < list.length; i++) {
        tableshow += `
         <tbody >
        <tr id="row-${list[i].Id}">
                    <td>${list[i].Id}</td>
                    <td>${list[i].Name}</td>
                    <td>${list[i].Age}</td>
                    <td> <button class="delete" onclick="remove(${list[i].Id})" >DELETE</button>
                    <td> <button class="edit" onclick="edit(${list[i].Id})" >EDIT</button>
            </tr>
             </tbody>
        
        `
    }
    table.innerHTML = tableshow;
}