document.getElementById("series").addEventListener("change",()=> 
{
  document.getElementById("output").value = null;
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
    
  //In Case of Invalid Input
  if (N % 1 != 0 || N < 0 || N=="") {
    document.getElementById("output").value = null;
  }

  //N-Factorial Program
  else if (select == 0) {
    result = 1;
    while (N > 1) {
      result *= N;
      N--;
    }
  }

  //First N Numbers Sum Program
  else if (select == 1) {
    result = 0;
    do {
      result += N;
      N--;
    } while (N > 0);
  }

  //Average of first N Numbers Program
  else if (select == 2) {
    result = 0;
    for (let i = 0; i <= N; i++) {
      result += i;
    }
    result /= N;
  }
  N!="" ? document.getElementById("output").value = result : null;
});