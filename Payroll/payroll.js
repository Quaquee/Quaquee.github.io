//Functions (Alphabetical Order)
function addRow() {
  let employeeInfo = {
    "employeeName":document.getElementById("employeeName").value,
    "daysWorked":document.getElementById("daysWorked").value,
    "dailyRate":document.getElementById("dailyRate").value,
    "grossPay":document.getElementById("grossPay").value,
    "deductionAmount":document.getElementById("deductionAmount").value,
    "netPay":document.getElementById("netPay").value
  };
  rowInfo.push(employeeInfo);
  updateRows();
}

function computeGrossPay() 
{
  document.getElementById("grossPay").value = document.getElementById("daysWorked").value * document.getElementById("dailyRate").value;
  computeNetPay();
}

function computeNetPay()
{
  document.getElementById("netPay").value = document.getElementById("grossPay").value - document.getElementById("deductionAmount").value;
}

function deleteConfirmation() {
  document.getElementById("confirmationDeleteMsg").innerHTML = "Delete which line number?";
  dlgConfirmationDelete.showModal();
}

function deleteRow() {
  let n = document.getElementById("rowDelete").value;
  n > 0 ? rowInfo.splice(n-1, 1) : null;
  document.getElementById("rowDelete").value = null;
  updateRows();
}

function deleteAll() {
  document.getElementById("rowDisplay").innerHTML = null;
  rowInfo = [];
}

function save() {
  localStorage.setItem("tableSave", JSON.stringify(rowInfo));
}

function retrieveSave() {
  rowInfo = JSON.parse(localStorage.getItem("tableSave"));
  updateRows();
}

function updateRows() {
  document.getElementById("rowDisplay").innerHTML = "";
  let employeeCount = rowInfo.length;

  for (let i = 0; i < employeeCount; i++) {
    document.getElementById("rowDisplay").innerHTML +="<tr>"
    +"<td>"+(i+1)+"</td>"
    +"<td>"+rowInfo[i].employeeName+"</td>"
    +"<td>"+rowInfo[i].daysWorked+"</td>"
    +"<td>"+rowInfo[i].dailyRate+"</td>"
    +"<td>"+rowInfo[i].grossPay+"</td>"
    +"<td>"+rowInfo[i].deductionAmount+"</td>"
    +"<td>"+rowInfo[i].netPay+"</td>"
    +"</tr>";
  }

    //Reset Values
  document.getElementById("employeeName").value = null;
  document.getElementById("daysWorked").value = null;
  document.getElementById("dailyRate").value = null;
  document.getElementById("deductionAmount").value = null;
  document.getElementById("grossPay").value = null;
  document.getElementById("netPay").value = null;
}

//Main Function
let rowInfo = [];
(()=>
{
  try {
    const savedData = localStorage.getItem("tableSave");
    if (savedData) {
      rowInfo = JSON.parse(savedData);
      updateRows();
    }
  } 
  catch (error) {
    console.error("Error loading data from localStorage", error);
  }

  document.getElementById("daysWorked").addEventListener("input", computeGrossPay);
  document.getElementById("dailyRate").addEventListener("input", computeGrossPay);
  document.getElementById("deductionAmount").addEventListener("input", computeNetPay);
  document.getElementById("addRow").addEventListener("click", addRow);
  document.getElementById("deleteRow").addEventListener("click", deleteConfirmation);
  document.getElementById("deleteAll").addEventListener("click", deleteAll);
  document.getElementById("save").addEventListener("click", save);
  document.getElementById("retrieveSave").addEventListener("click", retrieveSave);


  confirmDelete.addEventListener("click", () =>{ 
    dlgConfirmationDelete.returnValue = "confirm";
    dlgConfirmationDelete.close("confirm");
  });

  cancelDelete.addEventListener("click", () => {
    dlgConfirmationDelete.returnValue = "cancel";
    dlgConfirmationDelete.close("cancel");
  });

  dlgConfirmationDelete.addEventListener("close", (choice) => {
    let choiceValue = choice.target.returnValue;
    if (choiceValue == "confirm") {
      deleteRow();
    }
  });
})();