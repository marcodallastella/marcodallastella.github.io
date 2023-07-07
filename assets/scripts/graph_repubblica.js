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

    var line = d3.line().x(function (d) {
        return x(d.days);
    }).y(function (d) {
        return y(d.count);
    });

    var path = svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line)
        .style("fill", "none")
        .style("stroke", "#8C4593")
        .style("stroke-width", 1.5);

    const zoom = d3.zoom()
        .scaleExtent([0.5, 20])
        .on("zoom", zoomed);

    svg.call(zoom);

    function zoomed(event) {
        var newX = event.transform.rescaleX(x);
        xAxis.scale(newX);
        svg.select(".x-axis").call(xAxis);
        path.attr("d", line.x(function(d) { return newX(d.days) }));
    }

    svg.append("text")
        .attr("x", (width / 6))
        .attr("y", 20 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "24px")
        .style("text-decoration", "underline")
        .text("Daily headlines");
});
