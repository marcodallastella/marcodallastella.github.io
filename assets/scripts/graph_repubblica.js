d3.csv("../data/headlines_days.csv").then(function (data) {
    var parseTime = d3.timeParse("%Y-%m-%d");

    data.forEach(function (d) {
        d.days = parseTime(d.days);
        d.count = +d.count;
    });

    var margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

        var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 500 500")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    

    var x = d3.scaleTime().domain(d3.extent(data, function (d) {
        return d.days;
    })).range([0, width]);

    var xAxis = d3.axisBottom(x);
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    var y = d3.scaleLinear().domain([0, d3.max(data, function (d) {
        return +d.count;
    })]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));


    svg.selectAll(".timeline-rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "timeline-rect")
    .attr("x", function (d) { return x(d.days); })
    .attr("y", function (d) { return y(d.count); })
    .attr("width", 2) // Adjust the width of each rectangle as per your preference
    .attr("height", function (d) { return height - y(d.count); })
    .style("fill", function (d) {
        // You can define a color scale based on the count value
        // Here's an example using a linear color scale
        var colorScale = d3.scaleLinear()
            .domain([0, d3.max(data, function (d) { return d.count; })])
            .range(["#FFFFFF", "#FF0000"]); // Adjust the color range as per your preference
        return colorScale(d.count);
    });





    // var line = d3.line().x(function (d) {
    //     return x(d.days);
    // }).y(function (d) {
    //     return y(d.count);
    // });

    // var path = svg.append("path")
    //     .datum(data)
    //     .attr("class", "line")
    //     .attr("d", line)
    //     .style("fill", "none")
    //     .style("stroke", "#8C4593")
    //     .style("stroke-width", 1.5);

    

    svg.append("text")
        .attr("x", (width / 6))
        .attr("y", 20 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "24px")
        .style("font-family", "Garamond")
        .text("Berlusconi in the headlines");
});
