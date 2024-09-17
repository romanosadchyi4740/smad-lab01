function buttonSolve(){

  const origArr = readArray();
  document.getElementById("avgstat").innerHTML=avgstat();
  document.getElementById("mode").innerHTML=mode();
  document.getElementById("median").innerHTML=median();
  document.getElementById("range").innerHTML=range();
  document.getElementById("dispersion").innerHTML=dispersion();
  document.getElementById("serKvadr").innerHTML=serKvadr();
  document.getElementById("vyprDyspr").innerHTML=vyprDyspr();
  document.getElementById("vyprSer").innerHTML=vyprSer();
  document.getElementById("variation").innerHTML=variation();
  document.getElementById("pm").innerHTML=pm(document.getElementById("pmo").value);
  document.getElementById("cm").innerHTML=cm(document.getElementById("cmo").value);
  document.getElementById("assym").innerHTML=assymetry();
  document.getElementById("exc").innerHTML=excess();
  const frequency = occur(readArray());

  google.charts.load('current', {packages: ['corechart', 'line']});
  google.charts.setOnLoadCallback(drawCurveTypes);
  google.charts.setOnLoadCallback(drawCurveTypes2);
  google.charts.setOnLoadCallback(drawCurveTypes4);
  google.charts.setOnLoadCallback(drawCurveTypes5);

  google.charts.setOnLoadCallback(drawChart3);
  function drawCurveTypes() {
    const data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', '');
    //alert(frequency[1]);
    data.addRows(frequency[0].map((item, index) => ([item, frequency[1][index]])));
    const options = {
      hAxis: {
        title: ''
      },
      vAxis: {
        minValue: 0,
        title: ''
      },
      series: {
        1: {curveType: 'function'}
      },
      pointsVisible: true
    };
    const chart = new google.visualization.LineChart(
        document.getElementById('chart_div')
    );
    chart.draw(data, options);
  }

  function drawCurveTypes4() {
    let relfreq = [...frequency[1]];
    relfreq = relfreq.map(function(val){return val/=origArr.length;});
    const data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', '');
    //alert(frequency[1]);
    data.addRows(frequency[0].map((item, index) => ([item, relfreq[index]])));
    const options = {
      hAxis: {
        title: ''
      },
      vAxis: {
        minValue: 0,
        title: ''
      },
      series: {
        1: {curveType: 'function'}
      },
      pointsVisible: true
    };
    const chart =
      new google.visualization.LineChart(document.getElementById('chart_div4'));
    chart.draw(data, options);
  }
  function drawCurveTypes2() {
    const cumulative=[];
    cumulative.push(frequency[1][0])
    for(let i=1; i<frequency[0].length; i++){
      cumulative.push(cumulative[i-1]+frequency[1][i]);
    }
    const data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', '');
    //alert(frequency[1]);
    data.addRows(frequency[0].map((item, index) => ([item, cumulative[index]])));
    const options = {
      hAxis: {
        title: ''
      },
      vAxis: {
        title: '',
        mivValue: 0
      },
      series: {
        1: {curveType: 'function'}
      },
      pointsVisible: true
    };
    const chart = new google.visualization.LineChart(document.getElementById('chart_div2'));
    chart.draw(data, options);
  }

  function drawCurveTypes5() {
    let i;
    const cumulative=[];
    cumulative.push(frequency[1][0])
    for(i = 1; i<frequency[0].length; i++){
      cumulative.push(cumulative[i-1]+frequency[1][i]);
    }
    for(i = 0; i<cumulative.length; i++){
      cumulative[i]/=origArr.length;
    }
    const data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', '');
    //alert(frequency[1]);
    data.addRows(frequency[0].map((item, index) => ([item, cumulative[index]])));
    const options = {
      hAxis: {
        title: ''
      },
      vAxis: {
        title: '',
        mivValue: 0
      },
      series: {
        1: {curveType: 'function'}
      },
      pointsVisible: true
    };
    const chart = new google.visualization.LineChart(document.getElementById('chart_div5'));
    chart.draw(data, options);
  }
  function drawChart3() {
    let i;
    const cumulative=[];
    cumulative.push(frequency[1][0])
    for(i = 1; i<frequency[0].length; i++){
      cumulative.push(cumulative[i-1]+frequency[1][i]);
    }
    for(i = 0; i<cumulative.length; i++){
      cumulative[i]/=origArr.length;
    }

    cumulative.unshift(0);
    frequency[0].push(frequency[0][frequency[0].length-1]+0.5);
    const rawData = frequency[0].map((item, index) => ([item, cumulative[index]]));
    rawData.unshift(['Director (Year)', 'Емпірична функція розподілу']);
    const data = google.visualization.arrayToDataTable(rawData);
    const options = {
      backgroundColor: '#ddd',
      legend: {position: 'bottom'},
      connectSteps: false,
      colors: ['#4374E0', '#53A8FB', '#F1CA3A', '#E49307'],
      isStacked: true,
    };
    const chart = new google.visualization.SteppedAreaChart(document.getElementById('chart_div3'));
    chart.draw(data, options);
  }
}

//Функції призначені для:
//зчитування масиву з таблиці
function readArray(){
  const table = document.getElementById("tbl");
  const arr=[];
  let row = table.rows[0];
  let j = 1, col;
  for (; col = row.cells[j]; j++) {
    arr.push(parseFloat(row.cells[j].innerHTML));
  }
  return arr;
}
//обчислення середнього статистичного
function avgstat(){
  const arr = readArray();
  const sum = arr.reduce(function (a, b) {
    return a + b;
  }, 0);
  return sum/arr.length;
}
//обчислення моди
function mode(){
  const array = readArray();
  const maxEl=[];
  const occurArr = occur(array);

  maxEl.push(occurArr[0][0]);
  let maxOccur = occurArr[1][0];
  for(let i = 1; i<occurArr[0].length; i++){
    if(occurArr[1][i]>maxOccur){
      maxEl.length=0;
      maxEl.push(occurArr[0][i]);
      maxOccur=occurArr[1][i];
    }
    else if(occurArr[1][i]===maxOccur){
      maxEl.push(occurArr[0][i]);
    }
  }
  return maxEl;
}
//обчислення медіани
function median(){
  const array = readArray();
  array.sort();
  let median;
  if(array.length%2===0){
    median=(array[array.length/2]+array[array.length/2-1])/2;
  }
  else{
    median=array[Math.floor(array.length/2)];
  }
  return median;
}
//обчислення дисперсії
function dispersion(){
  const array = readArray();
  const avg = avgstat();
  let dispersia = 0;
  for(let i=0; i<array.length; i++){
    dispersia+=array[i]**2;
  }
  dispersia/=array.length;
  dispersia-=avg**2;

  return dispersia;
}
//обчисленн середнього квадратичного
function serKvadr(){
  let serKvadr = dispersion();
  serKvadr=Math.sqrt(serKvadr);
  return serKvadr;
}
//обчислення обсягу вибірки
function range(){
  const array = readArray();
  const range = Math.max(...array) - Math.min(...array);
  return range;
}
//обчислення виправленої дисперсії
function vyprDyspr(){
  const array = readArray();
  let vd = dispersion();
  vd*=((array.length)/(array.length-1));
  return vd;
}

//обчислення виправленого середнього квадратичного
function vyprSer(){
  const vs = vyprDyspr();
  return Math.sqrt(vs);
}
//обчислення варіації
function variation(){
  const vs = vyprSer();
  const avg = avgstat();
  return vs/avg;
}
//обчислення початкового моменту(параметр - порядок)
function pm(order){
  const array = readArray();
  let pm = 0;
  for(let i=0; i<array.length; i++){
    pm+=array[i]**order;
  }
  pm/=array.length;
  return pm;
}
//обчислення центрального моменту(параметр - порядок)
function cm(order){
  const array = readArray();
  const avg = avgstat();
  let cm = 0;
  for(let i=0; i<array.length; i++){
    cm+=(array[i]-avg)**order;
  }
  cm/=array.length;
  return cm;
}
//обчислення асиметрії
function assymetry(){
  return cm(3)/(serKvadr()**3);
}
//обчислення ексцесу
function excess(){
  return (cm(4)/(serKvadr()**4))-3;
}
//побудова дискретного варіаційного ряду
function occur(arr) {
  let a = [], b = [], prev;
  arr.sort();
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== prev) {
      a.push(arr[i]);
      b.push(1);
    } else {
      b[b.length - 1]++;
    }
    prev = arr[i];
  }
  return [a, b];
}
//додати нову колонку в таблицю
function appendColumn() {
  const row = document.getElementById("mainRow");
  const x = row.insertCell(document.getElementById("mainRow").cells.length);
  x.innerHTML = Math.round(Math.random()*1000)/100;
}
//видалити останню колонку з таблиці
function deleteColumn() {
  const row = document.getElementById("mainRow");
  const x = row.deleteCell(document.getElementById("mainRow").cells.length - 1);
}
