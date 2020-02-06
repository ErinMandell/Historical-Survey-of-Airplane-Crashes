// Load the data
d3.json("/geoData").then(response => {
  console.log("start");
  
  var crashData = [];
  crashData = response;
  console.log(crashData);

  // Make array of years
  
  var date = crashData.map(d => d.Year);
  console.log(date);

 // Make new array for x axis
    var firstYear = 1908;
    var finalYear = 2010;
    var numYearsToUse = finalYear-firstYear;

    crashPerYear = [];

     for (i = 0; i < numYearsToUse; i++){
       crashPerYear[i] = 0;
     }
     console.log(`crashPerYear.length = ${crashPerYear.length}`);
     console.log(crashPerYear);

  //Loop through and count crashes per year    
    for (i = 0; i< date.length; i++)
    {
      year = date[i];
      // console.log(`year = ${year}`);
    
      index = year - firstYear;
      // console.log(`index = ${index}`);
      
      crashPerYear[index]++;
      // console.log(`crashes = ${crashPerYear[index]}`);
    }

// // APEX code       
  var options = {
    series: [
    {
      name: "Crashes per year",
      data: crashPerYear

    }],
    chart: {
    height: 450,
    type: 'line',
    dropShadow: {
      enabled: true,
      color: '77B6EA',
      top: 18,
      left: 7,
      blur: 10,
      opacity: 0.2
    },
    toolbar: {
      show: false
    }
  },
  colors: ['#77B6EA'],
  dataLabels: {
    enabled: true,
  },
  stroke: {
    curve: 'smooth'
  },
  title: {
    text: 'Plane Crashes 1908-2009',
    align: 'left',
    color: '#999'
  },
  grid: {
    borderColor: '#e7e7e7',
    row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.
    },
  },
  markers: {
    size: 1
  },
  xaxis: {
    categories: ['1908', '1909', '1910', '1911', '1912', '1913', '1914', '1915', '1916', '1917', '1918', '1920', '1921', '1922', '1923', '1924', '1925', '1926', '1927', '1928', '1929', '1930', '1931', '1932', '1933', '1934', '1935', '1936', '1937', '1938', '1939', '1940', '1941', '1942', '1943', '1944', '1945', '1946', '1947', '1948', '1949', '1950', '1951', '1952', '1953', '1954', '1955', '1956', '1957', '1958', '1959', '1960', '1961', '1962', '1963', '1964', '1965', '1966', '1967', '1968', '1969', '1970', '1971', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009'],
    title: {
      text: 'Year',
      color: '#e7e7e7'
    }
  },
  yaxis: {
    title: {
      text: 'Number of Crashes',
      color: "#77B6EA",
    },
    min: 0,
    max: 105
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
    floating: true,
    offsetY: -25,
    offsetX: -5
  }
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
});