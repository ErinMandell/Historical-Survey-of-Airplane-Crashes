d3.json("/milData", function(response) 
{
    console.log("start");
    // console.log(response);
    var crashData = response;
    console.log(crashData);

    var militaryCrashes = [];
    var nonMilitaryCrashes = [];

    crashData.forEach(function(crash) {
      if (crash.Military == 'Military') {
        militaryCrashes.push(crash);
      }

      else {
        nonMilitaryCrashes.push(crash);
      }

    })
    console.log(militaryCrashes);
    console.log(nonMilitaryCrashes);


    var sumM = militaryCrashes.map(element => element.Total_Fatalities).reduce((a, b) => a + b, 0);
    console.log(sumM);

    var sumNM = nonMilitaryCrashes.map(element => element.Total_Fatalities).reduce((a, b) => a + b, 0);
    console.log(sumNM);

    var trace1 = {
      labels: ['Military', 'Non-Military'],
      values: [sumM, sumNM],
      type: "pie"
    };
    
    // making trace1 into an array / list, could add more elements to this list
    var data = [trace1];
    
    var layout = {
      title: "",
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    }
    
    // make a new plot in the thing called 'plot' in the html.
    // "plot" is a shirley variable.
    Plotly.newPlot("PiePlot", data, layout);
  
});




