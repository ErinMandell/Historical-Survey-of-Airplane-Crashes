d3.json("/milData", function(response) 
{
    console.log("start");
    // console.log(response);

    sortedFatalities = [];
    sortedFatalities = response;
    slicedFatalaties = sortedFatalities.slice(0, 20);
    reversedFatalities = slicedFatalaties.reverse();

    console.log(sortedFatalities);
    console.log(slicedFatalaties);


    var trace1 = {
      x: reversedFatalities.map(object => object.Total_Fatalities),
      y: reversedFatalities.map(object => object.Operator),
      text: reversedFatalities.map(object => object.Operator),
      name: "Crashes",
      type: "bar",
      orientation: "h"
    };

    var data = [trace1];

    var layout = {
      title: "Fatalities by Flight Operator  (1918-2018 unless noted otherwise)",
      margin: {
        l: 400,
        r: 100,
        t: 100,
        b: 100
      }
    }

    Plotly.newPlot("plot", data, layout)
});






