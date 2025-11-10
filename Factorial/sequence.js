document.getElementById("series").addEventListener("change",()=> 
{
  document.getElementById("output").value = null;
  document.getElementById("warning").innerHTML = null;
});


document.getElementById("clear").addEventListener("click", ()=>
{
  document.getElementById("output").value = null;
  document.getElementById("inputN").value = null;
});


document.getElementById("calculate").addEventListener("click", ()=>
{   
  let select = document.getElementById("series").value;
  let N = document.getElementById("inputN").value * 1;
  let result = 0;
  document.getElementById("warning").innerHTML = null;

  //In Case of Invalid Input
  if (N % 1 != 0 || N < 0 || N == "") {
    document.getElementById("output").value = null;
  }

  //N-Factorial Program
  else if (select == 0) {
    result = 1;
    if (N < 171) {
      while (N > 1) {
        result *= N;
        N--;
      }
      document.getElementById("output").value = result;
    }

    else {
      document.getElementById("warning").innerHTML = "<strong>WARNING: The input is too large. MAX INPUT: 170<strong>"
      document.getElementById("output").value = null;
    }

  }

  //First N Numbers Sum Program
  else if (select == 1) {
    result = 0;

    if (N < 1e8) {
      do {
        result += N;
        N--;
      } while (N > 0);
      document.getElementById("output").value = result;
    }

    else {
      document.getElementById("warning").innerHTML = "<strong>WARNING: Large inputs may lead to crashing and loss of precision. MAX INPUT: 99 999 999<strong>"
      document.getElementById("output").value = null;
    }
  }

  //Average of first N Numbers Program
  else if (select == 2) {
    if (N < 1e8) {
      result = 0;
      for (let i = 0; i <= N; i++) {
        result += i;
      }
      result /= N;
      document.getElementById("output").value = result;
    }
    
    else {
      document.getElementById("warning").innerHTML = "<strong>WARNING: Large inputs may lead to crashing and loss of precision. MAX INPUT: 99 999 999<strong>"
      document.getElementById("output").value = null;
    }
  }
});