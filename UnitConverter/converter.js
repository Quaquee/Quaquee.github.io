  function convertUnit() {
    let selection = document.getElementById("convert").value * 1;
    let x = document.getElementById("inputUnit").value * 1;
    let y = 0;

    switch (selection) {
      case 0: y = (x - 32) * 5 / 9; break;

      case 1: y = x * 1.8 + 32; break;

      case 2: y = x / 0.3048; break;

      case 3: y = x * 0.3048; 
    }

    x!="" ? document.getElementById("outputUnit").value = y.toFixed(2) : document.getElementById("outputUnit").value = ""
  }

//MAIN FUNCTION
(() => {
  document.getElementById("convert").addEventListener("change", convertUnit);
  document.getElementById("inputUnit").addEventListener("input", convertUnit);
})();