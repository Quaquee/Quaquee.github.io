function factorial(N) {
  result = 1;    //0! = 1
  if (N < 171) {
    while (N > 1) {
      result *= N;
      N--;
    }
    return result;
  }

  else {
    document.getElementById("warning").innerHTML = "<strong>WARNING: The input is too large. MAX INPUT: 170<strong>"
    return null;
  }
}

function sum(N) {
  result = 0;    //Sum of first 0 nums is 0

  if (N < 1e8) {
    do {
      result += N;
      N--;
    } while (N > 0);
    return result;
  }

  else {
    document.getElementById("warning").innerHTML = "<strong>WARNING: Large inputs may lead to crashing and loss of precision. MAX INPUT: 99 999 999<strong>"
    return null;
  }
}

function average(N) {
  if (N < 1e8) {
    result = 0;     //Average of first 0 nums is 0
    for (let i = 0; i <= N; i++) {
      result += i;
    }
    result /= N;
    return result;
  }
      
  else {
    document.getElementById("warning").innerHTML = "<strong>WARNING: Large inputs may lead to crashing and loss of precision. MAX INPUT: 99 999 999<strong>"
    return null;
  }
}

//MAIN FUNCTION
(() => {
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
    document.getElementById("warning").innerHTML = null;

    //In Case of Invalid Input
    if (N % 1 != 0 || N < 0 || N == "") {
      document.getElementById("output").value = null;
    }

    //N-Factorial Program
    else if (select == 0) {
      document.getElementById("output").value = factorial(N);
    }


    //First N Numbers Sum Program
    else if (select == 1) {
      document.getElementById("output").value = sum(N);
    }

    //Average of first N Numbers Program
    else if (select == 2) {
      document.getElementById("output").value = average(N);
    }
  });
})();