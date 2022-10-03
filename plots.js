function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");

    // Use the list of sample names to populate the select options

        var stockNames = ['BB','GOOGL','NFLX','Merged_Stocks']
        // 

        stockNames.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
        });


        // Use the first sample from the list to build the initial plots
                var stockName = stockNames[0];
                chartIt(stockName);
           
        
        }
        
        // Initialize the dashboard
        init();
        let myChart;
        function stocksChanged(stockName) {
            myChart.destroy()
            // Fetch new data each time a new sample is selected
            chartIt(stockName);
        
        
        }
        

function initDays() {
            // Grab a reference to the dropdown select element
            var day_selector = d3.select("#selDataset");
        
            // Use the list of sample names to populate the select options
        
            var days = [30, 60, 90]
                
        
                days.forEach((sample) => {
                    selector
                        .append("option")
                        .text(sample)
                        .property("value", sample);
                });

                
        // Use the first sample from the list to build the initial plots
        var days = days[0];
        chartIt(days);
   

}

// Initialize the dashboard
initDays();
let myChartDays;
function daysChanged(days) {
    myChartDays.destroy()
    // Fetch new data each time a new sample is selected
    chartIt(days);


}

    
        

        

// chartIt();

async function chartIt(stockName) {
    const data = await getData(stockName);

    const ctx = document.getElementById('chart').getContext('2d');
    myChart = new Chart(ctx, {

        type: 'line',
        data: {
            labels: data.xaxis,
            datasets: [{
                label: `${stockName} Stocks`,
                data: data.yaxis,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}


async function getData(stockName,days) {
    const xaxis = [];
    const yaxis = [];

    const response = await fetch(`Resources/${stockName}.csv`);
    const data = await response.text();
        // console.log(data);

    let table = data.split('\n').slice(1);
    table = table.reverse().slice(0,days).reverse()
    // console.log(table);
    table.forEach(row => {
        const columns = row.split(',');
        const year = columns[0];
        xaxis.push(year);
        const close = columns[4];
        yaxis.push(close);

        console.log(year, close);
    });
    return { xaxis, yaxis };

}
