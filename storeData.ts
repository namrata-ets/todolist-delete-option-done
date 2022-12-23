interface taskData {
  tid: string;
  name: string;
  status: string;
  stime: string;
  etime: string;
}

var selectedRow:Object|null=null;
var index:number=0;

function onFormSubmit() {
        if (selectedRow===null){
            storeData();
		    }
        else{
            update();
		    }
        resetForm();    
}

function storeData(): void {
  var formdata = (JSON.parse(localStorage.getItem("formdata")) ||
    []) as taskData[];

  formdata.push({
    tid: (<HTMLInputElement>document.getElementById("taskid")).value,
    name: (<HTMLInputElement>document.getElementById("taskname")).value,
    status: (<HTMLInputElement>document.getElementById("status")).value,
    stime: (<HTMLInputElement>document.getElementById("starttime")).value,
    etime: (<HTMLInputElement>document.getElementById("endtime")).value,
  });

  localStorage.setItem("formdata", JSON.stringify(formdata));

  deleteTable();
  generateTable();
}
//window.onload=()=>generateTable();

function deleteTable(): void {
  var tasktbl = document.getElementById("taskTable");
  if (tasktbl) tasktbl.remove();
}

function generateTable() {
  // creates a <table> element and a <tbody> element
  const tbl = document.createElement("table");
  tbl.setAttribute("id", "taskTable");

  const tblBody = document.createElement("tbody");

  // creates a table row
  var row = document.createElement("tr");

  // creating all header cells
  const h1 = document.createElement("th");
  const c1 = document.createTextNode("TaskID");
  h1.appendChild(c1);
  row.appendChild(h1);

  const h2 = document.createElement("th");
  const c2 = document.createTextNode("TaskName");
  h2.appendChild(c2);
  row.appendChild(h2);

  const h3 = document.createElement("th");
  const c3 = document.createTextNode("Status");
  h3.appendChild(c3);
  row.appendChild(h3);

  const h4 = document.createElement("th");
  const c4 = document.createTextNode("Start Time");
  h4.appendChild(c4);
  row.appendChild(h4);

  const h5 = document.createElement("th");
  const c5 = document.createTextNode("End Time");
  h5.appendChild(c5);
  row.appendChild(h5);

  const h6 = document.createElement("th");
  const c6 = document.createTextNode("Edit");
  h6.appendChild(c6);
  row.appendChild(h6);

  const h7 = document.createElement("th");
  const c7 = document.createTextNode("Delete");
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
      const cell1 = document.createElement("td");
      const cellText1 = document.createTextNode(data[i].tid);
      cell1.appendChild(cellText1);
      row2.appendChild(cell1);

      const cell2 = document.createElement("td");
      const cellText2 = document.createTextNode(data[i].name);
      cell2.appendChild(cellText2);
      row2.appendChild(cell2);

      const cell3 = document.createElement("td");
      const cellText3 = document.createTextNode(data[i].status);
      cell3.appendChild(cellText3);
      row2.appendChild(cell3);

      const cell4 = document.createElement("td");
      const cellText4 = document.createTextNode(data[i].stime);
      cell4.appendChild(cellText4);
      row2.appendChild(cell4);

      const cell5 = document.createElement("td");
      const cellText5 = document.createTextNode(data[i].etime);
      cell5.appendChild(cellText5);
      row2.appendChild(cell5);

      const cell6 = document.createElement("button");
      cell6.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
      cell6.setAttribute("align", "center");
      cell6.addEventListener("click", editRecord);
      row2.appendChild(cell6);

      const cell7 = document.createElement("button");
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

function removeRecord(this: any) {
  console.log("Delete button activated");
  if (confirm("Are you sure want to delete this record?")) {
    var selectedRow = this.parentNode.parentNode;
    var td = localStorage.getItem("formdata");
    if (td !== null) {
      var tarr = JSON.parse(td) as taskData[];
      // console.log(tarr);
      var o = document.getElementById("taskTable") as HTMLTableElement;
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
  (<HTMLInputElement>document.getElementById("taskid")).value = "";
  (<HTMLInputElement>document.getElementById("taskname")).value = "";
  (<HTMLInputElement>document.getElementById("status")).value = "";
  (<HTMLInputElement>document.getElementById("starttime")).value = "";
  (<HTMLInputElement>document.getElementById("endtime")).value = "";
}

function edit(this:any) {
  var selectedRow=this.parentNode.parentNode;
 (<HTMLInputElement> document.getElementById("taskid")).value = selectedRow.cells[0].innerHTML;
 (<HTMLInputElement>document.getElementById("taskname")).value = selectedRow.cells[1].innerHTML;
 (<HTMLInputElement>document.getElementById("status")).value = selectedRow.cells[2].innerHTML;
 (<HTMLInputElement>document.getElementById("starttime")).value = selectedRow.cells[3].innerHTML;
  (<HTMLInputElement>document.getElementById("endtime")).value = selectedRow.cells[4].innerHTML;
}

function update() {

  var taskid = (<HTMLInputElement>document.getElementById("taskid")).value;

  var tarr = JSON.parse(localStorage.getItem("formdata")) as taskData[];
  var rowIndex:number=0;
  console.log(tarr);

  var temparr: string | string[]|any= [];

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
    tid: (<HTMLInputElement>document.getElementById("id")).value,
    name: (<HTMLInputElement>document.getElementById("name")).value,
    status:(<HTMLInputElement>document.getElementById("status")).value,
    stime: (<HTMLInputElement>document.getElementById("start time")).value,
    etime: (<HTMLInputElement>document.getElementById("end time")).value,
  });
  console.log("Array after pushing records" + tarr);
  localStorage.setItem("formdata", JSON.stringify(tarr));
  generateTable();
}
