function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);

  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);

  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
  
    var samples = data.samples;
    // console.log(samples);

    // Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadataArray = data.metadata.filter(sampleObj => sampleObj.id == sample);

    // Create a variable that holds the first sample in the array.
    var result = resultArray[0];

    // 2. Create a variable that holds the first sample in the metadata array.
    var metadata = metadataArray[0];

    // Filter the data for the object with the desired sample number

    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}


function buildCharts(sample) {
  d3.json("samples.json").then((data) => {
  
    var samples = data.samples;
    // console.log(samples);

    // Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadataArray = data.metadata.filter(sampleObj => sampleObj.id == sample);

    // Create a variable that holds the first sample in the array.
    var result = resultArray[0];

    // 2. Create a variable that holds the first sample in the metadata array.
    var metadata = metadataArray[0];

    var frequency = parseFloat(metadata.wfreq);
    // Filter the data for the object with the desired sample number
     

var gaugedata = [
  {
    type: "indicator",
    mode: "gauge+number",
    value: frequency,
    title: { text: "Scrub per Week",  font: { size: 30, color:"black" }},
    // delta: { reference: 0, increasing: { color: "RebeccaPurple" } },
    gauge: {
      axis: { range: [0, 10], tickwidth: 1, tickcolor: "black" },
      bar: { color: "black" },
      bgcolor: "white",
      borderwidth: 2,
      bordercolor: "black",
      steps: [
        { range: [0, 2], color: "red" },
        { range: [2, 4], color: "orange" },
        {range: [4, 6], color: "yellow"},
        {range: [6, 8], color: "lightgreen"},
        {range: [8, 10], color: "darkgreen"}

      ],
      threshold: {
        line: { color: "red", width: 4 },
        thickness: 0.75,
        value: frequency
      }
    }
  }
];

var gaugelayout = {
  width: 500,
  height: 400,
  margin: { t: 25, r: 25, l: 25, b: 25 },
  paper_bgcolor: "white",
  font: { color: "black", family: "Arial", size: 15 }
};

Plotly.newPlot('gauge', gaugedata, gaugelayout);
});
}

