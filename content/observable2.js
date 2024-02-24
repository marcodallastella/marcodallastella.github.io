data = FileAttachment("data/headlines_years_d3.csv").csv({ typed: true })

height = 500
margin = ({ top: 20, right: 30, bottom: 30, left: 40 })

x = d3.scaleTime()
    .domain(d3.extent(data, d => d.date))
    .range([margin.left, width - margin.right])

y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)]).nice()
    .range([height - margin.bottom, margin.top])

xAxis = (g) =>
    g.attr("transform", `translate(0,${height - margin.bottom})`).call(
        d3
            .axisBottom(x)
            .ticks(width / 80)
            .tickSizeOuter(0)
    )

yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(data.y))

function transition(path) {
    path.transition()
        .duration(7500)
        .attrTween("stroke-dasharray", tweenDash)
        .on("end", () => { d3.select(this).call(transition); });
}

function tweenDash() {
    const l = this.getTotalLength(),
        i = d3.interpolateString("0," + l, l + "," + l);
    return function(t) { return i(t) };
  }

  d3 = require('d3@5')