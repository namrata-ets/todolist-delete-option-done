var selectedRow = null;
var index = 0;
function onFormSubmit() {
    if (selectedRow === null) {
        storeData();
    }
    else {
        update();
    }
    resetForm();
}
function storeData() {
    var formdata = (JSON.parse(localStorage.getItem("formdata")) ||
        []);
    formdata.push({
        tid: document.getElementById("taskid").value,
        name: document.getElementById("taskname").value,
        status: document.getElementById("status").value,
        stime: document.getElementById("starttime").value,
        etime: document.getElementById("endtime").value
    });
    localStorage.setItem("formdata", JSON.stringify(formdata));
    deleteTable();
    generateTable();
}
//window.onload=()=>generateTable();
function deleteTable() {
    var tasktbl = document.getElementById("taskTable");
    if (tasktbl)
        tasktbl.remove();
}
function generateTable() {
    // creates a <table> element and a <tbody> element
    var tbl = document.createElement("table");
    tbl.setAttribute("id", "taskTable");
    var tblBody = document.createElement("tbody");
    // creates a table row
    var row = document.createElement("tr");
    // creating all header cells
    var h1 = document.createElement("th");
    var c1 = document.createTextNode("TaskID");
    h1.appendChild(c1);
    row.appendChild(h1);
    var h2 = document.createElement("th");
    var c2 = document.createTextNode("TaskName");
    h2.appendChild(c2);
    row.appendChild(h2);
    var h3 = document.createElement("th");
    var c3 = document.createTextNode("Status");
    h3.appendChild(c3);
    row.appendChild(h3);
    var h4 = document.createElement("th");
    var c4 = document.createTextNode("Start Time");
    h4.appendChild(c4);
    row.appendChild(h4);
    var h5 = document.createElement("th");
    var c5 = document.createTextNode("End Time");
    h5.appendChild(c5);
    row.appendChild(h5);
    var h6 = document.createElement("th");
    var c6 = document.createTextNode("Edit");
    h6.appendChild(c6);
    row.appendChild(h6);
    var h7 = document.createElement("th");
    var c7 = document.createTextNode("Delete");
    h7.appendChild(c7);
    row.appendChild(h7);
    // add the row to the end of the table body
    tblBody.appendChild(row);
    var td = localStorage.getItem("formdata");
    if (td !== null) {
        var data = JSON.parse(td);
        console.log("SIze of Data parsed from LS is " + data.length);
        var tid = tbl.getAttribute("id");
        console.log(tid);
        for (var i = 0; i < data.length; i++) {
            var row2 = document.createElement("tr");
            // Create a <td> element and a text node, make the text
            // node the contents of the <td>, and put the <td> at
            // the end of the table row
            var cell1 = document.createElement("td");
            var cellText1 = document.createTextNode(data[i].tid);
            cell1.appendChild(cellText1);
            row2.appendChild(cell1);
            var cell2 = document.createElement("td");
            var cellText2 = document.createTextNode(data[i].name);
            cell2.appendChild(cellText2);
            row2.appendChild(cell2);
            var cell3 = document.createElement("td");
            var cellText3 = document.createTextNode(data[i].status);
            cell3.appendChild(cellText3);
            row2.appendChild(cell3);
            var cell4 = document.createElement("td");
            var cellText4 = document.createTextNode(data[i].stime);
            cell4.appendChild(cellText4);
            row2.appendChild(cell4);
            var cell5 = document.createElement("td");
            var cellText5 = document.createTextNode(data[i].etime);
            cell5.appendChild(cellText5);
            row2.appendChild(cell5);
            var cell6 = document.createElement("button");
            cell6.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
            cell6.setAttribute("align", "center");
            cell6.addEventListener("click", editRecord);
            row2.appendChild(cell6);
            var cell7 = document.createElement("button");
            cell7.innerHTML = '<i class="fa-solid fa-trash"></i>';
            cell7.setAttribute("align", "center");
            cell7.addEventListener("click", removeRecord);
            row2.appendChild(cell7);
            tblBody.appendChild(row2);
        }
    }
    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    document.body.appendChild(tbl);
    // sets the border attribute of tbl to '2'
    tbl.setAttribute("border", "2");
    tbl.setAttribute("align", "center");
}
function editRecord() {
    console.log("Edit button activated");
}
function removeRecord() {
    console.log("Delete button activated");
    if (confirm("Are you sure want to delete this record?")) {
        var selectedRow = this.parentNode.parentNode;
        var td = localStorage.getItem("formdata");
        if (td !== null) {
            var tarr = JSON.parse(td);
            // console.log(tarr);
            var o = document.getElementById("taskTable");
            if (o !== null) {
                o.deleteRow(selectedRow.rowIndex);
                tarr.splice(selectedRow.rowIndex, 1);
                localStorage.setItem("formdata", JSON.stringify(tarr));
            }
        }
    }
    resetForm();
}
function resetForm() {
    document.getElementById("taskid").value = "";
    document.getElementById("taskname").value = "";
    document.getElementById("status").value = "";
    document.getElementById("starttime").value = "";
    document.getElementById("endtime").value = "";
}
function edit() {
    var selectedRow = this.parentNode.parentNode;
    document.getElementById("taskid").value = selectedRow.cells[0].innerHTML;
    document.getElementById("taskname").value = selectedRow.cells[1].innerHTML;
    document.getElementById("status").value = selectedRow.cells[2].innerHTML;
    document.getElementById("starttime").value = selectedRow.cells[3].innerHTML;
    document.getElementById("endtime").value = selectedRow.cells[4].innerHTML;
}
function update() {
    var taskid = document.getElementById("taskid").value;
    var tarr = JSON.parse(localStorage.getItem("formdata"));
    var rowIndex = 0;
    console.log(tarr);
    var temparr = [];
    for (var i = 0; i < tarr.length; i++) {
        temparr += tarr[i].tid;
        console.log(temparr);
        if (temparr.includes(taskid)) {
            rowIndex = i;
            console.log("Row Index of this task in array is: " + rowIndex);
            break;
        }
    }
    tarr.splice(rowIndex, 1);
    console.log("Array after deleting records" + tarr);
    tarr.push({
        tid: document.getElementById("id").value,
        name: document.getElementById("name").value,
        status: document.getElementById("status").value,
        stime: document.getElementById("start time").value,
        etime: document.getElementById("end time").value
    });
    console.log("Array after pushing records" + tarr);
    localStorage.setItem("formdata", JSON.stringify(tarr));
    generateTable();
}
