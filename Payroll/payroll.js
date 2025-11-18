//INITIALIZATION
function initEventHandler() {
  document.getElementById("employeeName").addEventListener("input", () => {
    document.getElementById("employeeName").value = document.getElementById("employeeName").value.replace(/[<>`"'\/\\;\[\]\{\}`]/g, ''); 
  });

  document.getElementById("daysWorked").addEventListener("change", computeGrossPay);
  document.getElementById("dailyRate").addEventListener("change", computeGrossPay);
  document.getElementById("deductionAmount").addEventListener("change", computeNetPay);
  document.getElementById("addRow").addEventListener("click", addRow);
  document.getElementById("deleteRow").addEventListener("click", deleteRowConfirmation);
  document.getElementById("deleteAll").addEventListener("click", deleteAllConfirmation);
  document.getElementById("save").addEventListener("click", saveConfirmation);
  document.getElementById("retrieveSave").addEventListener("click", retrieveConfirmation);

  //Delete Row
  confirmDeleteRow.addEventListener("click", deleteRow);

  //Delete All
  confirmDeleteAll.addEventListener("click", deleteAll);

  //Save Table
  confirmSave.addEventListener("click", save);

  //Load Saved Table
  confirmRetrieve.addEventListener("click", retrieveSave);
}

//DIALOG FUNCTIONS
//Delete Row
function deleteRowConfirmation() {
  dlgDeleteRow.showModal();
}

//Delete All?
function deleteAllConfirmation() {
  dlgDeleteAll.showModal();
}

//Save Table?
function saveConfirmation() {
  dlgSaveTable.showModal();
}

//Load Saved Table?
function retrieveConfirmation() {
  dlgRetrieveSave.showModal();
}

//OTHER FUNCTIONS (ALPHABETICAL ORDER)
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

  document.getElementById("rowDisplay").innerHTML +="<tr>"
  +"<td>"+(rowInfo.length)+"</td>"
  +"<td>"+employeeInfo.employeeName+"</td>"
  +"<td>"+employeeInfo.daysWorked+"</td>"
  +"<td>"+employeeInfo.dailyRate+"</td>"
  +"<td>"+employeeInfo.grossPay+"</td>"
  +"<td>"+employeeInfo.deductionAmount+"</td>"
  +"<td>"+employeeInfo.netPay+"</td>"
  +"</tr>";
  updateRows();
}

function computeGrossPay() 
{
  document.getElementById("daysWorked").value = round(document.getElementById("daysWorked").value, 0);
  document.getElementById("dailyRate").value = round(document.getElementById("dailyRate").value, 2);
  document.getElementById("grossPay").value = round(document.getElementById("daysWorked").value * document.getElementById("dailyRate").value, 2);
  computeNetPay();
}

function computeNetPay()
{
  document.getElementById("deductionAmount").value = round(document.getElementById("deductionAmount").value, 2);
  document.getElementById("netPay").value = round(document.getElementById("grossPay").value - document.getElementById("deductionAmount").value, 2);
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
  if (localStorage.getItem("tableSave")) {
    alert("Saved to local storage successfully!");
  }
  else {
    alert("Unsuccessful save, please try again.");
  }
}

function retrieveSave() {
  rowInfo = JSON.parse(localStorage.getItem("tableSave"));
  updateRows();
}

function round(IN, DP) {
    IN = parseFloat(IN);
    if (!isNaN(IN)) {
        IN = IN.toFixed(DP);
    }
    return IN;
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

//MAIN FUNCTION
let rowInfo = [];
(()=>
{
  //load saved table upon page loading
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

  //initialization
  initEventHandler();

})();