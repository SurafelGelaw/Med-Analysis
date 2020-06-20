var chart = new CanvasJS.Chart("chartContainer", {
	title: {
  	text: "Exporting Chart Data as CSV"
  },
	data: [
	{
		type: "column",
		dataPoints: [
			{ x: 10, y: 71 },
			{ x: 20, y: 55 },
			{ x: 30, y: 50 },
			{ x: 40, y: 65 },
			{ x: 50, y: 95 },
			{ x: 60, y: 68 },
			{ x: 70, y: 28 },
			{ x: 80, y: 34 },
			{ x: 90, y: 14 }
		]
	}
	]
});

chart.render();

document.getElementById("downloadCSV").addEventListener("click", function(){
  downloadCSV({ filename: "chart-data.csv", chart: chart })
});



function convertChartDataToCSV(args) {
  var result, ctr, keys, columnDelimiter, lineDelimiter, data;

  data = args.data || null;
  if (data == null || !data.length) {
    return null;
  }

  columnDelimiter = args.columnDelimiter || ',';
  lineDelimiter = args.lineDelimiter || '\n';

  keys = Object.keys(data[0]);

  result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  data.forEach(function(item) {
    ctr = 0;
    keys.forEach(function(key) {
      if (ctr > 0) result += columnDelimiter;
      result += item[key];
      ctr++;
    });
    result += lineDelimiter;
  });
  return result;
}

function downloadCSV(args) {
  var data, filename, link;
  var csv = "";
  for(var i = 0; i < args.chart.options.data.length; i++){
    csv += convertChartDataToCSV({
      data: args.chart.options.data[i].dataPoints
    });
  }
  if (csv == null) return;

  filename = args.filename || 'chart-data.csv';

  if (!csv.match(/^data:text\/csv/i)) {
    csv = 'data:text/csv;charset=utf-8,' + csv;
  }

  data = encodeURI(csv);
  link = document.createElement('a');
  link.setAttribute('href', data);
  link.setAttribute('download', filename);
  document.body.appendChild(link); // Required for FF
	link.click();
	document.body.removeChild(link);
}
