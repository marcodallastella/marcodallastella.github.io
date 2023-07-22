// Load your data with d3.csv()
d3.csv("venice-d3.csv")
  .then(data => {

    // Create an SVG container inside #my-svg-chart using d3.select().append()
    const svg = d3
      .select('#my-svg-chart')
      .append('svg')
      .attr('width', 800)
      .attr('height', 600)

    var currentMonth = 0;

    // Get the first data point (January)
    var currentData = data[0];

    // Create an array for residents once
    var residentsArray = Array.from({ length: Math.round(data[0].residents_2) }, () => ({ type: 'resident', value: data[0].residents_2 }));

    // For each resident node, set a random initial position
    residentsArray.forEach(function (d) {
      d.x = Math.random() * 800;
      d.y = Math.random() * 600;
    });

    function updateData() {
      // Get the data for the current month
      var monthData = data[currentMonth];

      // Create an array for tourists
      var touristsArray = Array.from({ length: Math.round(monthData.tourists_2) }, () => ({ type: 'tourist', value: monthData.tourists_2 }));

      // For each tourist node, set a random initial position
      touristsArray.forEach(function (d) {
        d.x = Math.random() * 800;
        d.y = Math.random() * 600;
      });

      // Combine the residents and tourists into a nodes array
      nodes = [...residentsArray, ...touristsArray];

      // Restart the simulation with the new data
      simulation.nodes(nodes).alpha(1).restart();

      // Increment currentMonth, or loop back to 0 if we've gone past the end of the data
      currentMonth = (currentMonth + 1) % data.length;
    }

    setInterval(updateData, 2000);  // Change data every 2000 milliseconds (2 seconds)

  }).catch(function (error) {
    console.log(error);
  });



